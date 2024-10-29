import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  HomeStack,
  BookingStack,
  SettingsStack,
} from "../stackNavigation/index";
import CheckAuthWrapper from "../../components/checkAuthenWapper";
import { commonStyles } from "../../commons/common_style";

const Tab = createBottomTabNavigator();

export default TabNavigation = () => {
  return (
    <CheckAuthWrapper>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            tabBarActiveTintColor: commonStyles.primary,
            tabBarInactiveTintColor: "black",
            unmountOnBlur: true,
            tabBarStyle: {
              height: 60,
              paddingTop: 5,
              paddingBottom: 5,

            },
            tabBarLabelStyle: {
              fontSize: 14,
              marginTop: 2,
            },
          };
        }}
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
