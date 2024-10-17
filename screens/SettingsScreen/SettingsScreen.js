import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SettingsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileContact}>+1-4842989351 · johndoe@gmail.com</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <MenuItem icon="heart-outline" title="Your favorites" subtitle="Reorder your favorite service in a click" />
          <MenuItem icon="card-outline" title="Payments" subtitle="Payment methods, Transaction History" />
          <MenuItem icon="location-outline" title="Manage Address" subtitle="" />
          <MenuItem icon="notifications-outline" title="Notifications" subtitle="View your past notifications" />
          <MenuItem icon="briefcase-outline" title="Register as partner" subtitle="Want to list your service? Register with us" />
          <MenuItem icon="information-circle-outline" title="About" subtitle="Privacy Policy, Terms of Services, Licenses" />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="red" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Helper Component for Menu Item
const MenuItem = ({ icon, title, subtitle }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons name={icon} size={24} color="#000" />
    <View style={styles.menuText}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle ? <Text style={styles.menuSubtitle}>{subtitle}</Text> : null}
    </View>
    <Ionicons name="chevron-forward-outline" size={24} color="#A0A0A0" />
  </TouchableOpacity>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContact: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  editText: {
    fontSize: 14,
    color: '#6200EE',
    marginTop: 5,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#A0A0A0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 10,
  },
});

