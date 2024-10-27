import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BookingDetailScreen = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeIcon}>
                <MaterialCommunityIcons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Order Details</Text>
            <View style={styles.row}>
                <Text style={styles.subTitle}>Woodlands Hills Salon</Text>
                <MaterialCommunityIcons name="heart-outline" size={24} color="black" />
            </View>
            <View style={styles.row}>
                <MaterialCommunityIcons name="store" size={24} color="black"/>
                <Text style={styles.text}>Shop Service</Text>
            </View>
            <View style={styles.divider}/>
            <View style={styles.row}>
                <MaterialCommunityIcons name="calendar" size={24} color="black"/>
                <Text style={styles.text}>10 March 2021</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Haircut</Text>

                <Text style={styles.price}>$160</Text>
            </View>
            <View style={styles.rowPrice}>
                <View style={styles.quantityBox}>
                    <Text style={styles.quantityBoxtext}>2</Text>
                </View>
                <Text style={styles.textPrice}>
                    x <Text style={styles.span}>$160</Text>
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Clean Shave</Text>

                <Text style={styles.price}>$160</Text>
            </View>
            <View style={styles.rowPrice}>
                <View style={styles.quantityBox}>
                    <Text style={styles.quantityBoxtext}>2</Text>
                </View>
                <Text style={styles.textPrice}>
                    x <Text style={styles.span}>$80</Text>
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.lightText}>Item total</Text>
                <Text style={styles.price}>$320</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.lightText}>Coupon Discount (NEW100)</Text>
                <Text style={[styles.price, styles.discount]}>-$100</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.boldText}>Grand Total</Text>
                <Text style={styles.boldPrice}>$210</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Reorder Booking</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    closeIcon: {
        marginTop: 46,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
        textAlign: 'left',
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
    },
    row: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    rowPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: -4,
    },
    text: {
        fontSize: 14,
        marginHorizontal: 4,
        fontWeight: 'bold',
    },
    lightText: {
        fontSize: 14,
        marginHorizontal: 4,
    },
    textPrice: {
        fontSize: 14,
    },
    quantityBox: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 5,
        marginHorizontal: 4,
        padding: 4,
        backgroundColor: '#ccffcc', // much lighter green
    },
    quantityBoxtext: {
        color: 'green',
        fontSize: 14,
        marginHorizontal: 4,
    },
    price: {
        marginLeft: 'auto',
        fontSize: 16,
    },
    discount: {
        color: 'green',
    },
    boldText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 4,
    },
    boldPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 'auto',
    },
    button: {
        backgroundColor: 'purple',
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default BookingDetailScreen;