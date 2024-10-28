import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CheckoutResultFailedScreen = () => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Booking', { screen: 'Booking Screen' });
  };

  return (
    <View style={styles.container}>
      <Ionicons name="close-circle" size={80} color="red" />
      <Text style={styles.failureMessage}>Checkout Failed</Text>
      <View style={styles.buttonContainer}>
        <Button title="Home" onPress={goToHome} color="#FF5252" />
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
  failureMessage: {
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

export default CheckoutResultFailedScreen;
