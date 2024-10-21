import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error("Error parsing token from AsyncStorage:", error);
    return null;
  }
};

const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', JSON.stringify(token));
  } catch (error) {
    console.error("Error saving token to AsyncStorage:", error);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error("Error removing token from AsyncStorage:", error);
  }
};

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  initializeAuth: async () => {
    const token = await getToken();
    if (token) {
      set({ isAuthenticated: true, user: token.userInfo });
      console.log("user info", token.userInfo);
    }
  },
  login: async (token) => {
    await saveToken(token);
    set({ isAuthenticated: true, user: token.userInfo });
  },
  logout: async () => {
    await removeToken();
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;