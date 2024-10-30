import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  RefreshControl,
} from "react-native";
import { aget, apost, apatch } from "../../commons/util_axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import useAuthStore from "../../commons/authenStore";
import { styles } from "./BookingScreen.style";
import { useRoute, useNavigation } from "@react-navigation/native";
import UpcomingBookingItem from "./Items/UpcomingBookingItem";
import PastBookingItem from "./Items/PastBookingItem";
import FavoritesBookingItem from "./Items/FavoritesBookingItem";

export default function BookingScreen() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [bookings, setBookings] = useState({
    past: [],
    upcoming: [],
    favorites: [],
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const route = useRoute();
  const navigation = useNavigation(); // Use useNavigation hook
  const { user } = useAuthStore();
  const userId = user._id;

  const fetchBookings = useCallback(
    async (type) => {
      try {
        const response = await aget(`/appointments/${type}/${userId}`);
        setBookings((prevBookings) => ({
          ...prevBookings,
          [type]: response.data || [],
        }));
      } catch (error) {
        console.error(`Error fetching ${type} bookings:`, error);
      }
    },
    [userId]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBookings("past");
    fetchBookings("upcoming");
    fetchBookings("favorites");
    setRefreshing(false);
  }, [fetchBookings]);

  useEffect(() => {
    const tab = route.params?.tab || "Upcoming";
    setActiveTab(tab);
  }, [route.params]);

  useEffect(() => {
    fetchBookings(activeTab.toLowerCase());
  }, [activeTab, fetchBookings]);

  const handleFavoriteToggle = async (appointmentId, isFavorite) => {
    try {
      const action = isFavorite ? "remove-favorite" : "add-favorite";
      await apost(`/appointments/${userId}/${action}/${appointmentId}`);
      const updateBookings = (bookings) =>
        bookings.map((booking) =>
          booking.id === appointmentId
            ? { ...booking, isFavorite: !booking.isFavorite }
            : booking
        );
      setBookings((prevBookings) => ({
        ...prevBookings,
        past: updateBookings(prevBookings.past),
        upcoming: updateBookings(prevBookings.upcoming),
        favorites: updateBookings(prevBookings.favorites),
      }));
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const handleCancelBooking = (appointmentId) => {
    Alert.alert("Cancel Appointment", "You want to cancel this appointment?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await apatch(`/appointments/cancel/${appointmentId}`);
            setBookings((prevBookings) => ({
              ...prevBookings,
              upcoming: prevBookings.upcoming.filter(
                (booking) => booking.id !== appointmentId
              ),
              favorites: prevBookings.favorites.filter(
                (booking) => booking.id !== appointmentId
              ),
            }));
          } catch (error) {
            console.error("Error cancelling booking:", error);
          }
        },
      },
    ]);
  };

  const handleReschedule = async (appointmentId) => {
    const newDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes()
    ).toISOString();

    try {
      await apatch(`/appointments/reschedule/${appointmentId}`, {
        appointmentDate: newDateTime,
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error rescheduling booking:", error);
    }
  };

  const openRescheduleModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const handleDateConfirm = (date) => {
    if (moment(date).isBefore(moment(), "day")) {
      Alert.alert("Invalid Date", "You cannot select a date in the past.");
    } else {
      setSelectedDate(date);
    }
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    const startTime = moment("09:00", "HH:mm");
    const endTime = moment("17:00", "HH:mm");
    const selectedTimeMoment = moment(time);

    if (selectedTimeMoment.isBetween(startTime, endTime, null, "[]")) {
      setSelectedTime(time);
    } else {
      Alert.alert("Invalid Time", "Please choose a time between 9 AM and 5 PM");
    }
    setTimePickerVisibility(false);
  };

  const handleServiceItemPress = (itemId) => {
    navigation.navigate("Detail", { itemId: itemId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Your Bookings</Text>
        <View style={styles.tabs}>
          {["Past", "Upcoming", "Favorites"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {activeTab === "Past" && (
            <PastBookingItem
              bookings={bookings.past}
              handleFavoriteToggle={handleFavoriteToggle}
              handleServiceItemPress={handleServiceItemPress}
            />
          )}
          {activeTab === "Upcoming" && (
            <UpcomingBookingItem
              bookings={bookings.upcoming}
              handleFavoriteToggle={handleFavoriteToggle}
              handleCancelBooking={handleCancelBooking}
              openRescheduleModal={openRescheduleModal}
              handleServiceItemPress={handleServiceItemPress}
            />
          )}
          {activeTab === "Favorites" && (
            <FavoritesBookingItem
              bookings={bookings.favorites}
              handleFavoriteToggle={handleFavoriteToggle}
              handleServiceItemPress={handleServiceItemPress}
            />
          )}
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reschedule Booking</Text>
            {selectedBooking && (
              <>
                <Text style={[styles.modalText, { color: "black" }]}>
                  Appointment with {selectedBooking.stylistName}
                </Text>
                <Text style={[styles.modalText, { color: "black" }]}>
                  Current Date:{" "}
                  {new Date(
                    selectedBooking.appointmentDate
                  ).toLocaleDateString()}
                </Text>
                <TouchableOpacity
                  onPress={() => setDatePickerVisibility(true)}
                  style={styles.datePickerButton}
                >
                  <Text style={styles.datePickerButtonText}>
                    Choose New Date
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTimePickerVisibility(true)}
                  style={styles.datePickerButton}
                >
                  <Text style={styles.datePickerButtonText}>
                    Choose New Time
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleDateConfirm}
                  onCancel={() => setDatePickerVisibility(false)}
                />
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleTimeConfirm}
                  onCancel={() => setTimePickerVisibility(false)}
                />
              </>
            )}
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleReschedule(selectedBooking.id)}
              >
                <Text style={styles.modalButtonText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
