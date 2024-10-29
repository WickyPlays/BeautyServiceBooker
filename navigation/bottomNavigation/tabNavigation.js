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

export default TabNavigation = () => {
  return (
    <CheckAuthWrapper>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "black",
          unmountOnBlur: true,
          tabBarStyle: {
            paddingBottom: 10,
            display: route.name === "Detail" ? "none" : "flex",
          },
        })}
      >
        <Tab.Screen
          name="Home"
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
