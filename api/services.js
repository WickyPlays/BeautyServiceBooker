import axios from 'axios';

const getServices = async () => {
  try {
    const response = await axios.get('http://192.168.88.163:5001/services'); // Replace with your machine's IP address
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export { getServices };