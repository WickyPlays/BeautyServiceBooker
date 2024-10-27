
import {aget} from "../commons/util_axios";
const getServices = async () => {
  try {
    const response = await aget('/services'); // Replace with your machine's IP address
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export { getServices };