import React, { useEffect, useState, useCallback } from "react";
import {
	View,
	Text,
	ScrollView,
	Image,
	RefreshControl,
	ActivityIndicator,
	ToastAndroid,
	Share,
	TouchableOpacity,
	Alert,
} from "react-native";
import {
	useRoute,
	useNavigation,
	useFocusEffect,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Divider, Avatar } from "react-native-elements";
import { styles } from "./DetailScreen.style";
import { aget, apost } from "../../commons/util_axios";
import { renderStars } from "../../commons/common_style";
import { addServiceId, getServiceIds, removeServiceId, hasServiceId } from "../../commons/checkoutStore";
import DetailCommentSection from "./DetailCommentSection";
import CryptoJS from "crypto-js";

export default function DetailScreen() {
	const [refreshing, setRefreshing] = useState(false);
	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [filteredComments, setFilteredComments] = useState([]);
	const [selectedRating, setSelectedRating] = useState(null);
	const [showFixedHeader, setShowFixedHeader] = useState(false);
	const [isWishlist, setIsWishlist] = useState(false);

	const [isBooked, setIsBooked] = useState(false);

	const route = useRoute();
	const navigation = useNavigation();
	const itemId = route.params.itemId;

	useEffect(() => {
		navigation.setOptions({ headerShown: false, tabBarStyle: { display: 'none' } });
	}, []);


	const fetchData = useCallback(async () => {
		setLoading(true);

		try {
			const response = await aget(`/services/${itemId}`);
			const fetchedItem = response.data;
			setItem(fetchedItem);

			await refreshComments();

			let hasBooked = await hasServiceId(itemId);
			setIsBooked(hasBooked);

		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, [itemId]);

	const handleScroll = (event) => {
		const yOffset = event.nativeEvent.contentOffset.y;
		if (yOffset > 100) {
			setShowFixedHeader(true);
		} else {
			setShowFixedHeader(false);
		}
	};

	const handleBookService = async () => {
		if (isBooked) {
			navigation.navigate("Checkout");
		} else {
			await addServiceId(itemId);
			setIsBooked(true);
		}
	};

	const handleCancelBookService = async () => {

		const cancelButtonPressed = await new Promise((resolve, reject) => {
			Alert.alert(
				"Cancel Booking",
				"Are you sure you want to cancel your booking?",
				[
					{
						text: "No",
						onPress: () => resolve(false),
						style: "cancel",
					},
					{
						text: "Yes",
						onPress: () => resolve(true),
					},
				],
				{ cancelable: false }
			);
		});

		if (cancelButtonPressed) {
			await removeServiceId(itemId);
			setIsBooked(false);
		}
	};

	const refreshComments = async () => {
		try {
			const commentsResponse = await aget(`/services/comments/${itemId}`);
			const commentsData = commentsResponse.data;

			const tempComments = commentsData.map(comment => {
				const emailHash = CryptoJS.SHA256(comment.author.email.trim().toLowerCase()).toString();
				return {
					id: comment._id,
					userID: comment.author._id,
					username: comment.author.name,
					text: comment.content,
					rating: comment.rating,
					date: new Date(comment.createdAt).toISOString().split('T')[0],
					avatar: `https://www.gravatar.com/avatar/${emailHash}?s=300&d=identicon`,
				};
			});

			setComments(tempComments);
			setFilteredComments(tempComments);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const onRefresh = () => {
		setRefreshing(true);
		fetchData();
	};

	const onShare = async () => {
		try {
			await Share.share({
				message: `Check out this product: ${item.name} at https://beautyservicebooker.com/items/${item._id}`,
			});
		} catch (error) {
			console.error(error.message);
		}
	}

	if (loading) {
		return (
			<View style={[styles.loadingContainer, { marginTop: 30 }]}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="arrow-back" size={23} color="black" />
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.homeButton}
					onPress={() => navigation.navigate("HomeScreen")}
				>
					<Ionicons name="home" size={23} color="black" />
				</TouchableOpacity>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<View style={{ flex: 1, marginTop: 30 }}>
			{showFixedHeader && (
				<View style={styles.fixedHeader}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Ionicons name="arrow-back" size={23} color="black" />
					</TouchableOpacity>
					<Text style={styles.fixedHeaderText}>{item?.name}</Text>
					<TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
						<Ionicons name="home" size={23} color="black" />
					</TouchableOpacity>
				</View>
			)}
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				onScroll={handleScroll}
				scrollEventThrottle={1}
			>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="arrow-back" size={23} color="black" />
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.homeButton}
					onPress={() => navigation.navigate("HomeScreen")}
				>
					<Ionicons name="home" size={23} color="black" />
				</TouchableOpacity>

				<Image style={styles.productImage} src={item?.image} />
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{item?.name}</Text>
					<Text style={styles.descriptionLabel}>Description:</Text>
					<Text style={styles.description}>{item?.description}</Text>

					<View style={styles.serviceDetails}>
						<Ionicons name="time-outline" size={20} color="gray" />
						<Text style={styles.detailText}>Duration: {item?.duration} min</Text>
					</View>

					<View style={styles.serviceDetails}>
						<Ionicons name="clipboard-outline" size={20} color="gray" />
						<Text style={styles.detailText}>
							Type: {item?.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : ""}
						</Text>
					</View>

					<View style={styles.genderContainer}>
						{item?.gender === "male" && (
							<View style={[
								styles.genderBadge,
								styles.maleBadge,
							]}>
								<Ionicons name="man-outline" size={20} color="white" />
								<Text style={styles.genderText}>
									For males
								</Text>
							</View>
						)}
						{item?.gender === "female" && (
							<View style={[
								styles.genderBadge,
								styles.femaleBadge,
							]}>
								<Ionicons name="woman-outline" size={20} color="white" />
								<Text style={styles.genderText}>
									For females
								</Text>
							</View>
						)}
						{item?.gender === "both" && (
							<View style={[
								styles.genderBadge,
								styles.bothBadge,
							]}>
								<Ionicons name="transgender-outline" size={20} color="white" />
								<Text style={styles.genderText}>
									Both genders
								</Text>
							</View>
						)}
					</View>

					<View style={styles.priceContainer}>
						<Text>Starting at</Text>
						<Text style={styles.discountedPrice}>${item.price}</Text>
					</View>

					<View style={styles.itemTool}>
						<TouchableOpacity style={{ marginLeft: 16 }} onPress={onShare}>
							<Ionicons name="share-social-outline" size={32} color="black" />
						</TouchableOpacity>
					</View>

					<Divider style={styles.divider} />

					<DetailCommentSection
						itemId={itemId}
						comments={comments}
						setComments={setComments}
						filteredComments={filteredComments}
						setFilteredComments={setFilteredComments}
						selectedRating={selectedRating}
						setSelectedRating={setSelectedRating}
						refreshComments={() => refreshComments(itemId)} />
				</View>
			</ScrollView>

			<View style={styles.bottomContainer}>
				{
					isBooked ? (
						<View style={styles.bookedContainer}>
							<TouchableOpacity
								style={styles.bookButtonCancel}
								onPress={handleCancelBookService}
							>
								<Ionicons name="close-circle" size={20} color="white" />
								<Text style={styles.bookText}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.bookButtonExist}
								onPress={handleBookService}
							>
								<Ionicons name="calendar-outline" size={20} color="white" />
								<Text style={styles.bookText}>User has booked this service</Text>
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity
							style={styles.bookButton}
							onPress={handleBookService}
						>
							<Ionicons name="calendar-outline" size={20} color="white" />
							<Text style={styles.bookText}>Book this service</Text>
						</TouchableOpacity>
					)
				}

			</View>

		</View>
	);
};

