import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import useAuthStore from "../commons/authenStore";
import useNavigationStore from "../navigationRef"; // Import useNavigationStore

const CheckAuthWrapper = ({ children }) => {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const { navigateToAuth } = useNavigationStore(); // Access navigateToAuth

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === null) {
      navigateToAuth();
    }
  }, [isAuthenticated, navigateToAuth]);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please log in to access this content.</Text>
      </View>
    );
  }

  return children;
};

export default CheckAuthWrapper;