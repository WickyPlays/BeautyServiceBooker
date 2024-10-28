import axios from "axios";
import { getToken } from "./store";

const MASTER_URL = "http://10.0.2.2:5001";

const axiosInstance = axios.create({
  baseURL: MASTER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {

  const token = await getToken();
  if (token) {
    const parsedToken = JSON.parse(token)
    config.headers.Authorization = `Bearer ${parsedToken.access_token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export const apost = async (path, data) => {
  try {
    const response = await axiosInstance.post(path, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const apostfile = async (path, selectedFile, dataObject) => {
  const formData = new FormData();

  Object.entries(dataObject).forEach(([key, value]) => {
    formData.append(key, value);
  });

  if (selectedFile) {
    formData.append("image", selectedFile);
  }

  try {
    const response = await axiosInstance.post(path, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const aget = async (path) => {
  try {
    const response = await axiosInstance.get(path);
    return response;
  } catch (error) {
    throw error;
  }
};

export const adelete = async (path) => {
  try {
    const response = await axiosInstance.delete(path);
    return response;
  } catch (error) {
    throw error;
  }
};

export const aupdate = async (path, data) => {
  try {
    const response = await axiosInstance.put(path, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const apatch = async (path, data) => {
  try {
    const response = await axiosInstance.patch(path, data);
    return response;
  } catch (error) {
    throw error;
  }
};