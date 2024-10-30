import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import SettingScreen from "../../screens/SettingsScreen/SettingsScreen";
import SettingSavedAddress from "../../screens/SettingsScreen/SettingsSavedAddress";
import BookingScreen from "../../screens/BookingScreen/BookingScreen";
import ShopScreen from "../../screens/ShopScreen/ShopScreen";
import FemaleShopScreen from "../../screens/ShopScreen/FemaleShopScreen";
import BookingDetailScreen from "../../screens/BookingScreen/BookingDetailScreen";

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: true,
    }}
  >
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="maleshop"
      component={ShopScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="femaleShop"
      component={FemaleShopScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);


const BookingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="Booking Screen"
        component={BookingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookingDetailScreen"
        component={BookingDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export { HomeStack, BookingStack, SettingsStack };
