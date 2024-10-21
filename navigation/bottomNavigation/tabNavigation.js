import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  HomeStack,
  BookingStack,
  SettingsStack,
} from "../stackNavigation/index";
import CheckAuthWrapper from "../../components/checkAuthenWapper";
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <CheckAuthWrapper>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          unmountOnBlur: true,
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Booking"
          component={BookingStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingsStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </CheckAuthWrapper>
  );
};

export default TabNavigation;
