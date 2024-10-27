import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const axiosClient = axios.create({
  baseURL: "http://10.87.29.30:5001/",
});

axiosClient.interceptors.request.use(async (config) => {
  const access_token = await AsyncStorage.getItem("token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosClient;
