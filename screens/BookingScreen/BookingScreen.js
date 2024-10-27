import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import useBookingStore from "../../commons/bookingStore";
import useAuthStore from "../../commons/authenStore";
export default function BookingScreen() {
  const [activeTab, setActiveTab] = useState("Past");
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuthStore();
  const { appointments, FetchAppointment } = useBookingStore();
  const userId = user._id;

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "Past") {
        await FetchAppointment(userId);
      }
    };
    fetchData();
  }, [userId, activeTab]);


	const PastBookingItem = () => (
		<View style={styles.bookingItem}>
			<View style={styles.bookingHeader}>
				<Text style={styles.bookingTitle}>Woodlands Hills Salon</Text>
				<TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
					<MaterialCommunityIcons
						name={isFavorite ? 'heart' : 'heart-outline'}
						size={24}
						color={isFavorite ? '#FF0000' : '#007BFF'}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.bookingDescription}>
				<Text style={styles.descriptionText}>Keira throughway</Text>
				<Text style={[styles.dot, styles.descriptionText]}>•</Text>
				<Text style={styles.descriptionText}>5.0 Kms</Text>
			</View>
			<Text style={styles.descriptionText}>Haircut x 1 + Shave x 1</Text>
			<View style={styles.bookingFooter}>
				<Text style={styles.descriptionText}>8 Mar 2021</Text>
				<Text style={[styles.dot, styles.descriptionText]}>•</Text>
				<Text style={styles.descriptionText}>$102</Text>
			</View>
			<View style={styles.buttonRow_Past}>
				<TouchableOpacity style={styles.reorderButton}>
					<Text style={styles.reorderButtonText}>Reorder Booking</Text>
				</TouchableOpacity>
			</View>
		</View>
	);

  const UpcomingBookingItem = () => (
    <View style={styles.bookingItem}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingTitle}>Woodlands Hills Salon</Text>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <MaterialCommunityIcons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#FF0000" : "#007BFF"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bookingDescription}>
        <Text style={styles.descriptionText}>Keira throughway</Text>
        <Text style={[styles.dot, styles.descriptionText]}>•</Text>
        <Text style={styles.descriptionText}>5.0 Kms</Text>
      </View>
      <Text style={styles.descriptionText}>Haircut x 1 + Shave x 1</Text>
      <View style={styles.bookingFooter}>
        <Text style={styles.descriptionText}>8 Mar 2021</Text>
        <Text style={[styles.dot, styles.descriptionText]}>•</Text>
        <Text style={styles.descriptionText}>$102</Text>
      </View>
      <View style={styles.buttonRow_Upcoming}>
        <TouchableOpacity onPress={() => alert("Cancel Booking pressed")}>
          <Text style={styles.cancelButtonText}>Cancel Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reorderButton}>
          <Text style={styles.reorderButtonText}>Reschedule Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const FavoritesBookingItem = () => (
    <View style={styles.bookingItem}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingTitle}>Woodlands Hills Salon</Text>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <MaterialCommunityIcons
            name={isFavorite ? "heart-outline" : "heart"}
            size={24}
            color={isFavorite ? "#FF0000" : "#007BFF"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bookingDescription}>
        <Text style={styles.descriptionText}>Keira throughway</Text>
        <Text style={[styles.dot, styles.descriptionText]}>•</Text>
        <Text style={styles.descriptionText}>5.0 Kms</Text>
      </View>
      <Text style={styles.descriptionText}>Haircut x 1 + Shave x 1</Text>
      <View style={styles.bookingFooter}>
        <Text style={styles.descriptionText}>8 Mar 2021</Text>
        <Text style={[styles.dot, styles.descriptionText]}>•</Text>
        <Text style={styles.descriptionText}>$102</Text>
      </View>
      <View style={styles.buttonRow_Past}>
        <TouchableOpacity style={styles.reorderButton}>
          <Text style={styles.reorderButtonText}>Reorder Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
    </View>
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
});
