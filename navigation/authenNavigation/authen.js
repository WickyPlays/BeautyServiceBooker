import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";
import SignupScreen from "../../screens/SignupScreen/SignupScreen";


const Stack = createStackNavigator();

// Stack for authen
const AuthStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SignupScreen"
      component={SignupScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export { AuthStackScreen };
