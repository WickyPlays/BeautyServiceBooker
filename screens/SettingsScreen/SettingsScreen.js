import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./SettingsScreen.style";
import CryptoJS from "crypto-js";
import {aget} from "../../commons/util_axios";
import useAuthStore from "../../commons/authenStore";
import useNavigationStore from "../../navigationRef";

const refreshTimeout = 2000;

export default function SettingsScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch user data
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await aget("/whois/profile");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserProfile().finally(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <ProfileSection user={user} navigation={navigation} />
            <MenuSection navigation={navigation} />
            <LogoutButton navigation={navigation} />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const ProfileSection = ({ user, navigation }) => {
  const emailHash = CryptoJS.SHA256(user.email.toLowerCase()).toString();
  const uri = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

  return (
    <View style={styles.profileContainer}>
      <Image source={{ uri }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileContact}>
          {user.phone} · {user.email}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile Edit")}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MenuSection = ({ navigation }) => (
  <View style={styles.menuContainer}>
    {menuItems.map(({ icon, title, subtitle, redirectStack, redirect }, index) => (
      <MenuItem
        key={index}
        navigation={navigation}
        icon={icon}
        title={title}
        subtitle={subtitle}
        redirectStack={redirectStack}
        redirect={redirect}
      />
    ))}
  </View>
);

const MenuItem = ({ navigation, icon, title, subtitle, redirectStack, redirect }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={() => redirect && navigation.navigate(redirectStack, redirect)}
  >
    <Ionicons name={icon} size={24} color="#000" />
    <View style={styles.menuText}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    <Ionicons name="chevron-forward-outline" size={24} color="#A0A0A0" />
  </TouchableOpacity>
);

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigateToAuth = useNavigationStore((state) => state.navigateToAuth);

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={async () => {
        await logout();
        navigateToAuth();
      }}
    >
      <Ionicons name="log-out-outline" size={24} color="red" />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
};

const menuItems = [
  {
    icon: "heart-outline",
    title: "Your favorites",
    subtitle: "Reorder your favorite appointments in a click",
    redirectStack: "Booking",
    redirect: {
      screen: "Booking Screen",
      params: {
        tab: "Favorites",
      },
    },
  },
  {
    icon: "location-outline",
    title: "Manage Address",
    redirectStack: "Setting",
    redirect: {
      screen: "SettingsSavedAddress",
    },
  },
  {
    icon: "notifications-outline",
    title: "Notifications",
    subtitle: "View your past notifications",
  },
  {
    icon: "information-circle-outline",
    title: "About",
    subtitle: "Privacy Policy, Terms of Services, Licenses",
  },
];
