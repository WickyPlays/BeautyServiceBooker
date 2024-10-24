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

export default function DetailScreen() {
	const [refreshing, setRefreshing] = useState(false);
	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [filteredComments, setFilteredComments] = useState([]);
	const [selectedRating, setSelectedRating] = useState(null);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [showFixedHeader, setShowFixedHeader] = useState(false);
	const [isWishlist, setIsWishlist] = useState(false);

	const route = useRoute();
	const navigation = useNavigation();
	const itemId = route.params.itemId;

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, []);

	const checkUserLoggedIn = async () => {
		//Check user logged in
	};

	const fetchData = useCallback(async () => {
		console.log("Item id: " + itemId);
		setLoading(true);

		try {
			const response = await aget(`/services/${itemId}`);
			const fetchedItem = response.data;
			setItem(fetchedItem);

			//TEMPORARY SOLUTION
			let tempComments = [
				{
					id: 1,
					username: "John",
					text: "This is a comment",
					rating: 5,
					date: "2022-01-01",
					avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
				},
				{
					id: 2,
					username: "Jane",
					text: "This is another comment",
					rating: 4,
					date: "2022-01-02",
					avatar: "https://i.pravatar.cc/300?u=a042581f4e29026705d",
				},
			]
			setComments(tempComments);
			setFilteredComments(tempComments);

			await checkUserLoggedIn();
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

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useFocusEffect(() => {
		checkUserLoggedIn();
	});

	const onRefresh = () => {
		setRefreshing(true);
		fetchData();
	};

	const addToWishlist = async () => {
		setIsWishlist(true);
	};

	const removeFromWishlist = async () => {
		setIsWishlist(false);
	};

	const toggleWishlist = async () => {
		if (isWishlist) {
			await removeFromWishlist()
		} else {
			await addToWishlist();
			ToastAndroid.show("Item added to wishlist", ToastAndroid.SHORT);
		}
	};

	const onShare = async () => {
		try {
			await Share.share({
				message: `Check out this product: ${item.name} at https://beautyservicebooker.com/items/${item._id}`,
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleRatingFilter = (rating) => {
		setSelectedRating(rating);
		if (rating) {
			const filtered = comments.filter(
				(comment) => comment.rating >= rating && comment.rating < rating + 1
			);
			setFilteredComments(filtered);
		} else {
			setFilteredComments(comments);
		}
	};

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
					onPress={() => navigation.navigate("Home")}
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
					<TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
					onPress={() => navigation.navigate("Home")}
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
						<TouchableOpacity onPress={toggleWishlist}>
							<Ionicons
								name={isWishlist ? "heart" : "heart-outline"}
								size={32}
								color={isWishlist ? "red" : "black"}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={{ marginLeft: 16 }} onPress={onShare}>
							<Ionicons name="share-social-outline" size={32} color="black" />
						</TouchableOpacity>
					</View>

					<Divider style={styles.divider} />

					<View style={styles.ratingFilterContainer}>
						<Text style={styles.filterTitle}>Filter by Rating:</Text>
						<View style={styles.ratingFilter}>
							<TouchableOpacity
								style={selectedRating === null ? styles.ratingButtonSelected : styles.ratingButton}
								onPress={() => handleRatingFilter(null)}
							>
								<Text style={selectedRating === null ? styles.ratingTextSelected : styles.ratingText}>
									Show all
								</Text>
							</TouchableOpacity>
							{[1, 2, 3, 4, 5].map((rating) => (
								<TouchableOpacity
									key={rating}
									style={selectedRating === rating ? styles.ratingButtonSelected : styles.ratingButton}
									onPress={() => handleRatingFilter(rating)}
								>
									<Text style={selectedRating === rating ? styles.ratingTextSelected : styles.ratingText}>
										{rating}
									</Text>
									<Ionicons
										name="star"
										size={16}
										color={selectedRating === rating ? "#FFD700" : "gray"}
									/>
								</TouchableOpacity>
							))}
						</View>
					</View>

					<Divider style={styles.divider} />

					<View style={styles.commentContainer}>
						<Text style={styles.commentHeader}>Customer Reviews ({comments.length})</Text>
						{filteredComments.map((comment) => (
							<View key={comment.id} style={styles.comment}>
								<Avatar source={{ uri: comment.avatar }} rounded />
								<View style={styles.commentContent}>
									<Text style={styles.commentUsername}>{comment.username}</Text>
									{renderStars(comment.rating)}
									<Text style={styles.commentDate}>{comment.date}</Text>
									<Text style={styles.commentText}>{comment.text}</Text>
								</View>
							</View>
						))}
					</View>
				</View>
			</ScrollView>

			<View style={styles.bottomContainer}>
				<TouchableOpacity
					style={styles.bookButton}
					onPress={() => navigation.navigate("Booking")}
				>
					<Ionicons name="calendar-outline" size={20} color="white" />
					<Text style={styles.bookText}>Book this service</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

