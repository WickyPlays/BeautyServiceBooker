import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';
import { styles } from './CheckoutDateScreen.style';
import { getServiceDateId, setServiceDateId } from '../../commons/checkoutStore';
import { useNavigation } from '@react-navigation/native';

export const CheckoutDateScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const allTimes = [
    '09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM'
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const gmt7Date = moment(date).tz('Asia/Bangkok').format('ddd, MMM D');
    setSelectedDate(gmt7Date);
    hideDatePicker();
  };

  const handleConfirmButtonPress = () => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = moment(selectedTime, 'hh:mm A').format('HH:mm').split(':');
      const fullDateTime = moment.tz(selectedDate, 'ddd, MMM D', 'Asia/Bangkok')
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
        const datetime = moment(date).tz('Asia/Bangkok');
        setSelectedDate(datetime.format('ddd, MMM D'));
        setSelectedTime(datetime.format('hh:mm A'));
      } else {
        setSelectedDate(null);
        setSelectedTime(null);
      }
    };
    getDate();
  }, []);

  const today = moment().tz('Asia/Bangkok').format('ddd, MMM D');
  const filteredTimes = allTimes.map((time) => {
    const isToday = selectedDate === today;
    const timeMoment = moment.tz(time, 'hh:mm A', 'Asia/Bangkok');
    const isPast = isToday && timeMoment.isBefore(moment().tz('Asia/Bangkok'));

    return {
      time,
      isDisabled: isPast
    };
  });

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
          {filteredTimes.map(({ time, isDisabled }, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeBox,
                selectedTime === time && styles.selectedBox,
                isDisabled && styles.disabledTimeBox 
              ]}
              onPress={() => !isDisabled && setSelectedTime(time)}
              disabled={isDisabled}
            >
              <Text style={styles.timeText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.cardInfo}>Visa •••• 0981</Text>
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
