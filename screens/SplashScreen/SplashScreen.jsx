import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import {styles} from "./SplashScreen.style";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(async () => {
      navigation.navigate("LoginScreen")
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Welcome to</Text>
      <Text style={styles.title}>Beauty Service Booker</Text>
      <ActivityIndicator size="large" color="#007A00" />

      <Text style={styles.footer}>An MMA301 group project</Text>
    </View>
  );
}