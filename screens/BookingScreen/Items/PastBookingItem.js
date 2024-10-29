import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { styles } from "./PastBookingItem.style";
import { STATUS_STYLES } from "../../../commons/common_style";

const PastBookingItem = ({ bookings, handleFavoriteToggle, handleServiceItemPress }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <View style={styles.noBookingsContainer}>
        <Text style={styles.noBookingsText}>No past bookings found.</Text>
      </View>
    );
  }

  return (
    <>
      {bookings.map((booking) => (
        <View key={booking.id} style={styles.bookingItem}>
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingTitle}>{booking.userName}</Text>
            <TouchableOpacity
              onPress={() => handleFavoriteToggle(booking.id, booking.isFavorite)}
            >
              <MaterialCommunityIcons
                name={booking.isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={booking.isFavorite ? "#FF0000" : "#007BFF"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.bookingId}>ID: {booking.id}</Text>

          <View style={styles.bookingDescription}>
            <Ionicons name="person" size={18} color="#808080" />
            <Text style={styles.descriptionText}>{booking.stylistName}</Text>
            <Text style={[styles.dot, styles.descriptionText]}>•</Text>
            <Ionicons name="calendar" size={18} color="#808080" />
            <Text style={styles.descriptionText}>
              {new Date(booking.appointmentDate).toLocaleDateString()}
            </Text>
          </View>

          <View style={[styles.bookingStatus, { backgroundColor: STATUS_STYLES[booking.status.toLowerCase()].color }]}>
            <Ionicons name={STATUS_STYLES[booking.status.toLowerCase()].icon} size={18} color="#FFF" />
            <Text style={styles.statusText}>
              {STATUS_STYLES[booking.status.toLowerCase()].label}
            </Text>
          </View>

          {booking.services.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={styles.serviceItem}
              onPress={() => handleServiceItemPress(service.id)}
            >
              <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
              />
              <Text style={styles.descriptionText}>{service.serviceName}</Text>
              <Text style={[styles.dot, styles.descriptionText]}>•</Text>
              <Text style={styles.priceText}>${service.price}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.bookingFooter}>
            <Text style={styles.totalPriceText}>
              Total: <Text style={styles.totalPrice}>${booking.totalPrice}</Text>
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
};

export default PastBookingItem;
