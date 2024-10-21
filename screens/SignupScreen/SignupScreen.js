import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { styles } from "./SignupScreen.style";
import { apost } from "../../commons/util_axios";
import useNavigationStore from "../../navigationRef";
import useAuthStore from "../../commons/authenStore"; // Import useAuthStore
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigateToMain = useNavigationStore((state) => state.navigateToMain);
  const login = useAuthStore((state) => state.login); // Get the login function

  const handleSignup = async () => {
    if (!name || !email || !phone || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      // Register the user
      const registerResponse = await apost("/auth/register", {
        name,
        phone,
        email,
        password,
      });

      console.log("Signup response:", registerResponse); // Add logging to inspect the response

      if (
        registerResponse.status !== 201 ||
        registerResponse.data !== "User created successfully"
      ) {
        setErrorMessage("Something went wrong. Try again later");
        return;
      }

      // Log in the user
      const loginResponse = await apost("/auth/login", { email, password });

      console.log("Login response:", loginResponse); // Add logging to inspect the response

      if (loginResponse.status !== 200 || !loginResponse.data.access_token) {
        setErrorMessage("Something went wrong. Try again later");
        return;
      }

      // Assuming the response contains the token and userInfo
      const { access_token, userInfo } = loginResponse.data;
      console.log("check response", loginResponse.data);

      // Log in the user
      await login({ access_token, userInfo });

      // Navigate to the main screen after successful signup
      setErrorMessage("");
      navigateToMain();
    } catch (error) {
      console.error("Signup error:", error); // Add logging to inspect the error
      setErrorMessage("Error attempting to sign up");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign Up</Text>
        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Already have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="user123"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="123-456-7890"
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />

        {/* Display error message if any */}
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or Sign Up using</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/twitter.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/google.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/facebook.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
