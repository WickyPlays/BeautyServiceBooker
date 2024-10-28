import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { styles } from './CheckoutDateScreen.style';
import { getServiceDateId, setServiceDateId } from '../../commons/checkoutStore';
import { useNavigation } from '@react-navigation/native';

export const CheckoutDateScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const times = [
    '09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM'
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(moment(date).format('ddd, MMM D'));
    hideDatePicker();
  };

  const handleConfirmButtonPress = () => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = moment(selectedTime, 'hh:mm A').format('HH:mm').split(':');
      const fullDateTime = moment(selectedDate, 'ddd, MMM D')
        .set({ hour: parseInt(hours), minute: parseInt(minutes) })
        .toDate();

        setServiceDateId(fullDateTime);

      navigation.navigate('Checkout');
    } else {
      alert('Please select a date and time first.');
    }
  };

  useEffect(() => {
    const getDate = async () => {
      const date = await getServiceDateId();
      if (date) {
        const datetime = moment(date);
        setSelectedDate(datetime.format('ddd, MMM D'));
        setSelectedTime(datetime.format('hh:mm A'));
      } else {
        setSelectedDate(null);
        setSelectedTime(null);
      }
    };
    getDate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Select Date & Time for the appointment</Text>

      <View>
        <Text style={styles.sectionTitle}>Choose appointment date</Text>
        <TouchableOpacity
          style={[styles.dateBox, selectedDate && styles.selectedBox]}
          onPress={showDatePicker}
        >
          <Text style={styles.dateText}>
            {selectedDate ? selectedDate : 'Select a Date'}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
      </View>

      <View>
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
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.cardInfo}>Visa •••• 0981</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>$449</Text>
            <Text style={styles.taxText}>plus taxes</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmButtonPress}
          >
            <Text style={styles.confirmButtonText}>
              {selectedDate && selectedTime ? 'Confirm Selection' : 'Select Date & Time'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
