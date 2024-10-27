import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { aget, apost, apatch, aupdate } from "../../commons/util_axios"; // Import apatch for PATCH requests
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import useAuthStore from "../../commons/authenStore";

export default function BookingScreen() {
  const [activeTab, setActiveTab] = useState("Past");
  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [favoriteBookings, setFavoriteBookings] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const { user } = useAuthStore();
  const userId = user._id;

  useEffect(() => {
    const fetchPastBookings = async () => {
      try {
        console.log(`Fetching past bookings for userId: ${userId}`);
        const response = await aget(`/appointments/past/${userId}`);
        setPastBookings(response.data);
      } catch (error) {
        console.error("Error fetching past bookings:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      }
    };

    if (activeTab === "Past") {
      fetchPastBookings();
    }
  }, [activeTab, userId]);

  useEffect(() => {
    const fetchUpcomingBookings = async () => {
      try {
        console.log(`Fetching upcoming bookings for userId: ${userId}`);
        const response = await aget(`/appointments/up-coming/${userId}`);
        setUpcomingBookings(response.data);
      } catch (error) {
        console.error("Error fetching upcoming bookings:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      }
    };

    if (activeTab === "Upcoming") {
      fetchUpcomingBookings();
    }
  }, [activeTab, userId]);

  useEffect(() => {
    const fetchFavoriteBookings = async () => {
      try {
        console.log(`Fetching favorite bookings for userId: ${userId}`);
        const response = await aget(`/appointments/favorites/${userId}`);
        setFavoriteBookings(response.data);
      } catch (error) {
        console.error("Error fetching favorite bookings:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      }
    };

    if (activeTab === "Favorites") {
      fetchFavoriteBookings();
    }
  }, [activeTab, userId]);

  
  const handleFavoriteToggle = async (appointmentId, isFavorite) => {
    try {
      if (isFavorite) {
        await apost(`/appointments/${userId}/remove-favorite/${appointmentId}`);
      } else {
        await apost(`/appointments/${userId}/add-favorite/${appointmentId}`);
      }
      setPastBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === appointmentId
            ? { ...booking, isFavorite: !booking.isFavorite }
            : booking
        )
      );
      setUpcomingBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === appointmentId
            ? { ...booking, isFavorite: !booking.isFavorite }
            : booking
        )
      );
      setFavoriteBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === appointmentId
            ? { ...booking, isFavorite: !booking.isFavorite }
            : booking
        )
      );
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const handleCancelBooking = async (appointmentId) => {
    Alert.alert(
      "Cancel Appointment",
      "You want to cancel this appointment?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await apatch(`/appointments/cancel/${appointmentId}`);
              setUpcomingBookings((prevBookings) =>
                prevBookings.filter((booking) => booking.id !== appointmentId)
              );
              setFavoriteBookings((prevBookings) =>
                prevBookings.filter((booking) => booking.id !== appointmentId)
              );
            } catch (error) {
              console.error("Error cancelling booking:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleReschedule = async (appointmentId) => {
    try {
      const newDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes() // Ensure minutes are included
      );
      const newDateTimeISO = newDateTime.toISOString();
      console.log("Rescheduling to:", newDateTimeISO); // Log the newDateTime in ISO format
  
      // Log the request payload
      const payload = { appointmentDate: newDateTimeISO };
      console.log("Request payload:", payload);
  
      // Ensure the correct Content-Type header is set
      await apatch(`/appointments/reschedule/${appointmentId}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsModalVisible(false);
      // Update bookings if necessary
    } catch (error) {
      console.error("Error rescheduling booking:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  const openRescheduleModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    if (moment(date).isBefore(moment(), "day")) {
      alert("You cannot select a date in the past.");
    } else {
      setSelectedDate(date);
    }
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
    const selectedTime = moment(time).format("HH:mm");
    const startTime = moment("09:00", "HH:mm");
    const endTime = moment("17:00", "HH:mm");

    if (
      moment(selectedTime, "HH:mm").isBetween(startTime, endTime, null, "[]")
    ) {
      setSelectedTime(time);
    } else {
      alert("Please choose a time between 9 AM and 5 PM");
    }
    hideTimePicker();
  };

  const PastBookingItem = () => (
    <>
      {pastBookings.map((booking) => (
        <View key={booking.id} style={styles.bookingItem}>
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingTitle}>{booking.userName}</Text>
            <TouchableOpacity
              onPress={() =>
                handleFavoriteToggle(booking.id, booking.isFavorite)
              }
            >
              <MaterialCommunityIcons
                name={booking.isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={booking.isFavorite ? "#FF0000" : "#007BFF"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bookingDescription}>
            <Text style={styles.descriptionText}>{booking.stylistName}</Text>
            <Text style={[styles.dot, styles.descriptionText]}>•</Text>
            <Text style={styles.descriptionText}>
              {new Date(booking.appointmentDate).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.bookingStatus}>
            <Text style={styles.statusText}>Status: {booking.status}</Text>
          </View>
          {booking.services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
              />
              <Text style={styles.descriptionText}>{service.serviceName}</Text>
              <Text style={[styles.dot, styles.descriptionText]}>•</Text>
              <Text style={styles.descriptionText}>${service.price}</Text>
            </View>
          ))}
          <View style={styles.bookingFooter}>
            <Text style={styles.descriptionText}>
              Total: ${booking.totalPrice}
            </Text>
          </View>
          <View style={styles.buttonRow_Past}>
            <TouchableOpacity style={styles.reorderButton}>
              <Text style={styles.reorderButtonText}>Reorder Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );

  const UpcomingBookingItem = () => (
    <>
      {upcomingBookings.map((booking) => (
        <View key={booking.id} style={styles.bookingItem}>
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingTitle}>{booking.userName}</Text>
            <TouchableOpacity
              onPress={() =>
                handleFavoriteToggle(booking.id, booking.isFavorite)
              }
            >
              <MaterialCommunityIcons
                name={booking.isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={booking.isFavorite ? "#FF0000" : "#007BFF"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bookingDescription}>
            <Text style={styles.descriptionText}>{booking.stylistName}</Text>
            <Text style={[styles.dot, styles.descriptionText]}>•</Text>
            <Text style={styles.descriptionText}>
              {new Date(booking.appointmentDate).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.bookingStatus}>
            <Text style={styles.statusText}>Status: {booking.status}</Text>
          </View>
          {booking.services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
              />
              <Text style={styles.descriptionText}>{service.serviceName}</Text>
              <Text style={[styles.dot, styles.descriptionText]}>•</Text>
              <Text style={styles.descriptionText}>${service.price}</Text>
            </View>
          ))}
          <View style={styles.bookingFooter}>
            <Text style={styles.descriptionText}>
              Total: ${booking.totalPrice}
            </Text>
          </View>
          <View style={styles.buttonRow_Upcoming}>
            <TouchableOpacity onPress={() => handleCancelBooking(booking.id)}>
              <Text style={styles.cancelButtonText}>Cancel Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reorderButton}
              onPress={() => openRescheduleModal(booking)}
            >
              <Text style={styles.reorderButtonText}>Reschedule Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );

  const FavoritesBookingItem = () => (
    <>
      {favoriteBookings.map((booking) => (
        <View key={booking.id} style={styles.bookingItem}>
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingTitle}>{booking.userName}</Text>
            <TouchableOpacity
              onPress={() =>
                handleFavoriteToggle(booking.id, booking.isFavorite)
              }
            >
              <MaterialCommunityIcons
                name={booking.isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={booking.isFavorite ? "#FF0000" : "#007BFF"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bookingDescription}>
            <Text style={styles.descriptionText}>{booking.stylistName}</Text>
            <Text style={[styles.dot, styles.descriptionText]}>•</Text>
            <Text style={styles.descriptionText}>
              {new Date(booking.appointmentDate).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.bookingStatus}>
            <Text style={styles.statusText}>Status: {booking.status}</Text>
          </View>
          {booking.services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
              />
              <Text style={styles.descriptionText}>{service.serviceName}</Text>
              <Text style={[styles.dot, styles.descriptionText]}>•</Text>
              <Text style={styles.descriptionText}>${service.price}</Text>
            </View>
          ))}
          <View style={styles.bookingFooter}>
            <Text style={styles.descriptionText}>
              Total: ${booking.totalPrice}
            </Text>
          </View>
          <View style={styles.buttonRow_Past}>
            <TouchableOpacity style={styles.reorderButton}>
              <Text style={styles.reorderButtonText}>Reorder Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Your Bookings</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Past" && styles.activeTab]}
            onPress={() => setActiveTab("Past")}
          >
            <Text style={styles.tabText}>Past</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Upcoming" && styles.activeTab]}
            onPress={() => setActiveTab("Upcoming")}
          >
            <Text style={styles.tabText}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Favorites" && styles.activeTab]}
            onPress={() => setActiveTab("Favorites")}
          >
            <Text style={styles.tabText}>Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        {activeTab === "Past" && <PastBookingItem />}
        {activeTab === "Upcoming" && <UpcomingBookingItem />}
        {activeTab === "Favorites" && <FavoritesBookingItem />}
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reschedule Booking</Text>
            {selectedBooking && (
              <>
                <Text style={styles.modalText}>
                  Appointment with {selectedBooking.stylistName}
                </Text>
                <Text style={styles.modalText}>
                  Current Date:{" "}
                  {new Date(
                    selectedBooking.appointmentDate
                  ).toLocaleDateString()}
                </Text>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={styles.datePickerButton}
                >
                  <Text style={styles.datePickerButtonText}>
                    Choose New Date
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={showTimePicker}
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
                  onCancel={hideDatePicker}
                />
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleTimeConfirm}
                  onCancel={hideTimePicker}
                />
              </>
            )}
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#f8f8f8",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 16,
  },
  navbarTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    justifyContent: "space-around",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
  },
  tabText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  bookingItem: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingDescription: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  bookingStatus: {
    marginVertical: 8,
  },
  statusText: {
    color: "#808080", // Gray color
  },
  dot: {
    marginHorizontal: 4,
  },
  bookingFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  buttonRow_Past: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  buttonRow_Upcoming: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  reorderButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  reorderButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  cancelButtonText: {
    color: "#FF0000",
    fontSize: 14,
    textDecorationLine: "none",
    marginTop: 10,
  },
  descriptionText: {
    color: "#808080", // Gray color
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  serviceImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  datePickerButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  datePickerButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
