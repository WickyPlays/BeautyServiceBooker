import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function CheckoutScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="arrow-left" size={24} color="black" />
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
                <View style={styles.row}>
                    <MaterialIcons name="calendar-today" size={24} color="black" />
                    <Text style={styles.rowText}>Select Date & Time</Text>
                    <FontAwesome name="chevron-right" size={24} color="black" style={{ marginLeft: 'auto' }} />
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.itemRow}>
                    <View>
                        <Text>Haircut</Text>
                        <Text style={styles.priceText}>$160</Text>
                    </View>
                    <View style={styles.counter}>
                        <TouchableOpacity style={styles.counterButton}>
                            <Text>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.counterText}>1</Text>
                        <TouchableOpacity style={styles.counterButton}>
                            <Text>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.itemPrice}>$160</Text>
                    </View>
                </View>
                <View style={styles.itemRow}>
                    <View>
                        <Text>Clean Shave</Text>
                        <Text style={styles.priceText}>$80</Text>
                    </View>
                    <View style={styles.counter}>
                        <TouchableOpacity style={styles.counterButton}>
                            <Text>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.counterText}>2</Text>
                        <TouchableOpacity style={styles.counterButton}>
                            <Text>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.itemPrice}>$160</Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.row}>
                    <FontAwesome name="gift" size={24} color="black" />
                    <Text style={styles.rowText}>Offers & Promo Code</Text>
                    <Text style={styles.viewOffers}>View offers</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Frequently added together</Text>
                <View style={styles.imageRow}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: 'https://placehold.co/96x96' }} style={styles.image} />
                        <Text style={styles.imageText}>Haircut</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: 'https://placehold.co/96x96' }} style={styles.image} />
                        <Text style={styles.imageText}>Haircut</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: 'https://placehold.co/96x96' }} style={styles.image} />
                        <Text style={styles.imageText}>Haircut</Text>
                    </View>
                </View>
            </View>
            <View style={styles.totalSection}>
                <View>
                    <Text style={styles.totalText}>2</Text>
                    <Text style={styles.totalPrice}>$449</Text>
                    <Text style={styles.totalSubText}>plus taxes</Text>
                </View>
                <TouchableOpacity style={styles.totalButton}>
                    <Text style={styles.totalButtonText}>Select Date & Time</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text>Item total</Text>
                    <Text>$112</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.discountText}>Coupon Discount</Text>
                    <Text style={styles.discountText}>-$10</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.amountPayableText}>Amount Payable</Text>
                    <Text style={styles.amountPayableText}>$30</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 16,
        marginTop: 64
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
    },
    section: {
        marginTop: 16,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    rowText: {
        marginLeft: 8,
        fontSize: 16,
    },
    priceText: {
        color: '#6B7280',
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterButton: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        padding: 4,
    },
    counterText: {
        marginHorizontal: 8,
    },
    itemPrice: {
        marginLeft: 16,
    },
    viewOffers: {
        marginLeft: 'auto',
        color: '#6D28D9',
    },
    imageRow: {
        flexDirection: 'row',
        marginTop: 8,
    },
    imageContainer: {
        width: 96,
        height: 96,
        backgroundColor: '#E5E7EB',
        marginRight: 8,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageText: {
        textAlign: 'center',
    },
    totalSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#6D28D9',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    totalText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    totalSubText: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    totalButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    totalButtonText: {
        color: '#6D28D9',
    },
    discountText: {
        color: '#10B981',
    },
    amountPayableText: {
        fontWeight: '600',
    },
});
