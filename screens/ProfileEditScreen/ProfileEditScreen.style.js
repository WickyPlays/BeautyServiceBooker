import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#f8f8f8',
  },
  centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
  },
  formContainer: {
      width: '100%',
      padding: 20,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
  },
  label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      color: '#333333',
  },
  input: {
      height: 40,
      borderColor: '#cccccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginTop: 5,
      backgroundColor: '#f9f9f9',
  },
  buttonUpdate: {
      backgroundColor: '#6440FE',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
      alignItems: 'center',
  },
  buttonUpdateText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
  },
});