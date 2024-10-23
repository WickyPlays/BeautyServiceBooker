import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "./SplashScreen.style";
import { commonStyles } from "../../commons/common_style";

export default function SplashScreen() {

  useEffect(() => {
    const timer = setTimeout(() => {}, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Welcome to</Text>
      <Text style={styles.title}>Beauty Service Booker</Text>
      <ActivityIndicator size="large" color={commonStyles.primary} />

      <Text style={styles.footer}>An MMA301 group project</Text>
    </View>
  );
}