import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import {styles} from './CheckoutDateScreen.style';

export const CheckoutDateScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = [
    { id: '1', day: 'Sat', date: '19' },
    { id: '2', day: 'Sun', date: '20' },
    { id: '3', day: 'Mon', date: '21' },
    { id: '4', day: 'Tue', date: '22' },
    { id: '5', day: 'Wed', date: '23' }
  ];

  const times = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM'
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.subtitle}>Select Date & Time for the appointment</Text>

      {/* Date Selection */}
      <Text style={styles.sectionTitle}>When would you like your service?</Text>
      <FlatList
        horizontal
        data={dates}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dateBox,
              selectedDate === item.id && styles.selectedBox
            ]}
            onPress={() => setSelectedDate(item.id)}
          >
            <Text style={styles.dayText}>{item.day}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.dateContainer}
      />

      {/* Time Selection */}
      <Text style={styles.sectionTitle}>When would you like your service?</Text>
      <View style={styles.timeContainer}>
        {times.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeBox,
              selectedTime === time && styles.selectedBox
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={styles.timeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Payment and Confirmation */}
      <View style={styles.footer}>
        <Text style={styles.cardInfo}>Visa •••• 0981</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>$449</Text>
          <Text style={styles.taxText}>plus taxes</Text>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => alert('Date and Time Selected')}
        >
          <Text style={styles.confirmButtonText}>Select Date & Time</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
