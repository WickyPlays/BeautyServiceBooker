import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = 'userToken';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export const getUserFromToken = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }

    const decodedToken = jwtDecode(token);
    if (!decodedToken) {
      return null;
    }

    const { exp } = decodedToken;
    if (Date.now() >= exp * 1000) {
      await removeToken();
      return null;
    }

    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
