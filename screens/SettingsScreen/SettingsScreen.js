import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import useAuthStore from "../../commons/authenStore";
import useNavigationStore from "../../navigationRef";
import CryptoJS from "crypto-js";
const refreshTimeout = 2000;

export default function SettingsScreen({ navigation }) {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), refreshTimeout);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <ProfileSection user={user} />
        <MenuSection navigation={navigation} />
        <LogoutButton navigation={navigation} />
      </View>
    </ScrollView>
  );
}

const ProfileSection = ({ user }) => {
  const emailHash = CryptoJS.SHA256(user.email.toLowerCase()).toString();
  const uri = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

  return (
    <View style={styles.profileContainer}>
      <Image
        source={{ uri }}
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileContact}>
          {user.phone} · {user.email}
        </Text>
        <TouchableOpacity>
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

const MenuItem = ({ navigation, icon, title, subtitle, redirectStack,redirect }) => (
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

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: "#fff",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
  },
  profileContact: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  editText: {
    fontSize: 14,
    color: "#6200EE",
    marginTop: 5,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  menuSubtitle: {
    fontSize: 13,
    color: "#A0A0A0",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  logoutText: {
    color: "red",
    fontSize: 16,
    marginLeft: 10,
  },
});
