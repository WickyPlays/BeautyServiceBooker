import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import SettingScreen from "../../screens/SettingsScreen/SettingsScreen";
import SettingSavedAddress from "../../screens/SettingsScreen/SettingsSavedAddress";
import BookingScreen from "../../screens/BookingScreen/BookingScreen";
import ShopScreen from "../../screens/ShopScreen/ShopScreen";
import FemaleScreen from "../../screens/ShopScreen/FemaleScreen";
import BookingDetailScreen from "../../screens/BookingScreen/BookingDetailScreen";
import DetailScreen from "../../screens/DetailScreen/DetailScreen";
import CheckoutScreen from "../../screens/CheckoutScreen/CheckoutScreen";
import { CheckoutDateScreen } from "../../screens/CheckoutScreen/CheckoutDateScreen";
import CheckoutResultFailedScreen from "../../screens/CheckoutScreen/CheckoutResultFailedScreen";
import { CheckoutResultSuccessScreen } from "../../screens/CheckoutScreen/CheckoutResultSuccessScreen";
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
      component={FemaleScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{
        headerShown: false,
      }}
    />
     <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Checkout Date"
        component={CheckoutDateScreen}
        options={{
          headerShown: true
        }}
      />
      <Stack.Screen
        name="CheckoutResultSuccess"
        component={CheckoutResultSuccessScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CheckoutResultFailed"
        component={CheckoutResultFailedScreen}
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
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingsSavedAddress"
        component={SettingSavedAddress}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export { HomeStack, BookingStack, SettingsStack };
