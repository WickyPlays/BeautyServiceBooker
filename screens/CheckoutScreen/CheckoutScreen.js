import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl, StyleSheet, Alert, Linking, Image } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles } from './CheckoutScreen.style';
import { clearServiceIds, getServiceDateId, getServiceIds, removeServiceDateId } from '../../commons/checkoutStore';
import { aget, apost } from '../../commons/util_axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import useAuthStore from '../../commons/authenStore';
import { Picker } from '@react-native-picker/picker';

export default function CheckoutScreen() {

	const { user } = useAuthStore();
	const navigation = useNavigation();
	const [services, setServices] = useState([]);
	const [stylists, setStylists] = useState([]);
	const [selectedStylist, setSelectedStylist] = useState(null);
	const [refreshing, setRefreshing] = useState(false);
	const [date, setDate] = useState(null);

	const fetchServices = async () => {
		try {
			const serviceIds = await getServiceIds();
			const serviceData = await Promise.all(serviceIds.map(id => aget(`/services/${id}`)));
			setServices(serviceData.map(response => response.data));
		} catch (error) {
			console.error("Error fetching service data:", error);
		}

		let date = await getServiceDateId();
		setDate(date);
	};

	// Fetch stylists
	const fetchStylists = async () => {
		try {
			const response = await aget('/users/stylists');
			setStylists(response.data);
		} catch (error) {
			console.error("Error fetching stylists:", error);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchServices();
			fetchStylists();
		}, [])
	);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		Promise.all([fetchServices(), fetchStylists()]).then(() => setRefreshing(false));
	}, []);

	const handleCreateAppointment = async () => {
		if (!date || !selectedStylist || services.length === 0) {
			Alert.alert("Incomplete Information", "Please select a service, stylist, and date.");
			return;
		}

		try {
			// await apost('/appointments/create-appointment', {
			// 	serviceID: services.map(service => service._id),
			// 	stylistID: selectedStylist,
			// 	appointmentDate: date
			// }).then(async () => {
			// 	await removeServiceDateId();
			// 	await clearServiceIds();
			// 	navigation.navigate('CheckoutResultSuccess')
			// });
			await apost('/payment/create_payment_url', {
				serviceIDs: services.map(service => service._id),
			}).then(async (res) => {
				let data = res.data;
				let url = data.url;

				// Linking.openURL(url);
				navigation.navigate('CheckoutWebViewScreen', { url: url });
			})
		} catch (error) {
			console.error("Error creating appointment:", error);
			Alert.alert("Error", "Could not create appointment. Please try again.");
		}
	};

	return (
		<ScrollView
			style={styles.container}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<View style={styles.section}>
				<Text style={styles.title}>Woodlands Hills Salon</Text>
				<View style={styles.row}>
					<MaterialIcons name="store" size={24} color="black" />
					<Text style={styles.rowText}>Shop Service</Text>
				</View>
			</View>

			<View style={styles.section}>
				<TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Checkout Date')}>
					<MaterialIcons name="calendar-today" size={24} color="black" />
					<Text style={styles.rowText}>Select Date & Time</Text>
					<FontAwesome name="chevron-right" size={24} color="black" style={{ marginLeft: 'auto' }} />
				</TouchableOpacity>
			</View>

			{
				date ? (
					<View style={styles.appointmentDate}>
						<Ionicons name="timer-outline" size={24} color="black" />
						<Text style={{ marginLeft: 10 }}>Appointment date: {date ? moment(date).format('MMMM Do, YYYY HH:mm') : ''}</Text>
					</View>

				) : (
					<View style={styles.appointmentDateNon}>
						<Ionicons name="timer-outline" size={24} color="black" />
						<Text style={{ marginLeft: 10 }}>No date selected</Text>
					</View>
				)
			}

			<Text style={styles.serviceTitle}>Services:</Text>
			{services.map((service) => (
				<TouchableOpacity key={service._id} style={styles.item}
					onPress={() => navigation.navigate('Detail', { itemId: service._id })}>
					<View style={styles.itemInfo}>
						<Image source={{ uri: service.image }} style={styles.itemImage} />
						<Text>{service.name}</Text>
					</View>
					<Text style={styles.priceText}>${service.price}</Text>
				</TouchableOpacity>
			))}

			<View style={styles.section}>
				<Text style={styles.title}>Select Stylist</Text>
				<Picker
					selectedValue={selectedStylist}
					onValueChange={(itemValue, itemIndex) => setSelectedStylist(itemValue)}
					style={{ width: '100%' }}
				>
					<Picker.Item label="Select a Stylist" value={null} />
					{stylists.map((stylist) => (
						<Picker.Item
							key={stylist._id}
							label={`${stylist.name}`}
							value={stylist._id}
						/>
					))}
				</Picker>
				{
					(!selectedStylist) && (
						<Text style={styles.errorText}>Please select a stylist</Text>
					)
				}
			</View>

			<View style={styles.section}>
				<View style={styles.row}>
					<FontAwesome name="gift" size={24} color="black" />
					<Text style={styles.rowText}>Offers & Promo Code</Text>
					<Text style={styles.viewOffers}>View offers</Text>
				</View>
			</View>

			<View style={styles.totalSection}>
				<View style={styles.footerSummary}>
					<View style={styles.totalCount}>
						<Text style={styles.totalCountText}>{services.length}</Text>
					</View>
					<View>
						<Text style={styles.totalPrice}>${services.reduce((total, service) => total + service.price, 0)}</Text>
						<Text style={styles.taxText}>+ tax included</Text>
					</View>
				</View>

				<TouchableOpacity
					style={styles.totalButton}
					onPress={handleCreateAppointment}
				>
					<Text style={styles.totalButtonText}>
						{date && selectedStylist ? "Confirm appointment" : "Select Date & Stylist"}
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
