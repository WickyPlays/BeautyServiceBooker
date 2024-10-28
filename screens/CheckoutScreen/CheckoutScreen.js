import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './CheckoutScreen.style';
import { getServiceIds } from '../../commons/checkoutStore';
import { aget } from '../../commons/util_axios';
import { useNavigation } from '@react-navigation/native';

export default function CheckoutScreen() {

    const navigation = useNavigation();
    const [services, setServices] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchServices = async () => {
        try {
            const serviceIds = await getServiceIds();
            const serviceData = await Promise.all(serviceIds.map(id => aget(`/services/${id}`)));
            setServices(serviceData.map(response => response.data));
        } catch (error) {
            console.error("Error fetching service data:", error);
        }
    };

    // Refresh handler
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchServices().then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, }}>
                    <FontAwesome name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Checkout</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Woodlands Hills Salon</Text>
                <View style={styles.row}>
                    <MaterialIcons name="store" size={24} color="black" />
                    <Text style={styles.rowText}>Shop Service</Text>
                </View>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('CheckoutDate')}>
                    <MaterialIcons name="calendar-today" size={24} color="black" />
                    <Text style={styles.rowText}>Select Date & Time</Text>
                    <FontAwesome name="chevron-right" size={24} color="black" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
            </View>

            {/* Dynamically render each service */}
            {services.map((service, index) => (
                <View key={service._id} style={styles.section}>
                    <View style={styles.itemRow}>
                        <View>
                            <Text>{service.name}</Text>
                            <Text style={styles.priceText}>${service.price}</Text>
                        </View>
                    </View>
                </View>
            ))}

            <View style={styles.section}>
                <View style={styles.row}>
                    <FontAwesome name="gift" size={24} color="black" />
                    <Text style={styles.rowText}>Offers & Promo Code</Text>
                    <Text style={styles.viewOffers}>View offers</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text>Item total</Text>
                    <Text>${services.reduce((total, service) => total + service.price, 0)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.discountText}>Coupon Discount</Text>
                    <Text style={styles.discountText}>-$10</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.amountPayableText}>Amount Payable</Text>
                    <Text style={styles.amountPayableText}>${services.reduce((total, service) => total + service.price, 0) - 10}</Text>
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
                <TouchableOpacity style={styles.totalButton}>
                    <Text style={styles.totalButtonText}>Select Date & Time</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}