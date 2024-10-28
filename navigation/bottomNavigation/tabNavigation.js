import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
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
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "black",
          unmountOnBlur: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Booking"
          component={BookingStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Feather name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingsStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Feather name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </CheckAuthWrapper>
  );
};

export default TabNavigation;
