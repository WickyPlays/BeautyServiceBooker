import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CheckoutResultSuccessScreen = () => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Booking Screen');
  };

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={80} color="green" />
      <Text style={styles.successMessage}>Checkout Successful!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Home" onPress={goToHome} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  successMessage: {
    fontSize: 24,
    color: '#333333',
    marginVertical: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '60%',
    marginTop: 20,
  },
});
