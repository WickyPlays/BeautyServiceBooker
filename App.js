import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackScreen } from "./navigation/authenNavigation/authen";
import useAuthStore from "./commons/authenStore";
import TabNavigation from "./navigation/bottomNavigation/tabNavigation";
import { navigationRef } from "./navigationRef";
import SplashScreen from "./screens/SplashScreen/SplashScreen";
import Toast from 'react-native-toast-message';
import DetailScreen from "./screens/DetailScreen/DetailScreen";
import CheckoutScreen from "./screens/CheckoutScreen/CheckoutScreen";
import CheckoutResultFailedScreen from "./screens/CheckoutScreen/CheckoutResultFailedScreen";
import { CheckoutResultSuccessScreen } from "./screens/CheckoutScreen/CheckoutResultSuccessScreen";
import { CheckoutDateScreen } from "./screens/CheckoutScreen/CheckoutDateScreen";
import * as Linking from 'expo-linking';

const Stack = createStackNavigator();

const CheckAuthProvider = ({ children }) => {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [initializeAuth]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return children(isAuthenticated);
};

const linking = {
  prefixes: ["beautyservicebooker://"],
  config: {
    screens: {
      success: "CheckoutResultSuccess",
      failed: "CheckoutResultFailed",
    },
  },
};

export default function App() {
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <CheckAuthProvider>
        {(isAuthenticated) => (
          <Stack.Navigator>
            {!isAuthenticated ? (
              <Stack.Screen
                name="Auth"
                component={AuthStackScreen}
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="Main"
                  component={TabNavigation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="Detail" component={DetailScreen} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} />
                <Stack.Screen
                  name="CheckoutResultSuccess"
                  component={CheckoutResultSuccessScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CheckoutResultFailed"
                  component={CheckoutResultFailedScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Checkout Date"
                  component={CheckoutDateScreen}
                  options={{
                    headerShown: true
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        )}
      </CheckAuthProvider>
      <StatusBar style="auto" />
      <Toast />
    </NavigationContainer>
  );
}
