<<<<<<< HEAD
import axiosClient from 'axios';
import {aget} from "../commons/util_axios";
const getServices = async () => {
  try {
    const response = await aget('/services'); // Replace with your machine's IP address
=======
import axios from 'axios';

const getServices = async () => {
  try {
    const response = await axios.get('http://192.168.88.163:5001/services'); // Replace with your machine's IP address
>>>>>>> 514ff2a7ea1d9ef0764ac763239fa825c00e1e72
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export { getServices };