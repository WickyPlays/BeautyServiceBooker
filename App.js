import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackScreen } from "./navigation/authenNavigation/authen";
import useAuthStore from "./commons/authenStore";
import TabNavigation from "./navigation/bottomNavigation/tabNavigation";
import { navigationRef } from "./navigationRef";
import SplashScreen from "./screens/SplashScreen/SplashScreen";

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

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <CheckAuthProvider>
        {(isAuthenticated) => (
          <Stack.Navigator>
            {!isAuthenticated ? (
              <>
                <Stack.Screen
                  name="Auth"
                  component={AuthStackScreen}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Main"
                  component={TabNavigation}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        )}
      </CheckAuthProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}