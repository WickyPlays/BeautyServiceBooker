import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./LoginScreen.style.js";
import { Ionicons } from "@expo/vector-icons";
import { apost } from "../../commons/util_axios.js";
import useAuthStore from "../../commons/authenStore";
import useNavigationStore from "../../navigationRef";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigateToMain = useNavigationStore((state) => state.navigateToMain);

  const handleLogin = async () => {
    try {
      const response = await apost("/auth/login", { email, password });
      console.log("check response", response);
      const { access_token, userInfo } = response.data;

      if (response.status === 200 && access_token) {
        await login({ access_token, userInfo });
        setErrorMessage("");
        navigateToMain();
      } else {
        setErrorMessage("Something went wrong. Try again later");
      }
    } catch (error) {
      let status = error.response ? error.response.status : null;
      if (status === 401) {
        setErrorMessage("Invalid credentials");
      } else {
        setErrorMessage("Something went wrong. Try again later");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Welcome Back!</Text>
        <View style={styles.mainTitleContainer}>
          <Text style={styles.subtitle}>Don't have an account?</Text>
          <Text
            style={styles.signup}
            onPress={() => navigation.navigate("SignupScreen")}
          >
            Sign Up
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {/* Display error message if any */}
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>Forgot your Password?</Text>
      </View>
    </View>
  );
}
