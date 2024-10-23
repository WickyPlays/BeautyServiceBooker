import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";


const AuthenStack = createStackNavigator();

const AuthStack = () =>{
    <AuthenStack.Navigator>
        <AuthenStack.Screen name="Login" component={LoginScreen} />
    </AuthenStack.Navigator>
}

export default AuthStack;

