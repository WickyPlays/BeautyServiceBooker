import axiosClient from "./axios.js";

const getAppointment = (id) => {
  return axiosClient.get(`/appointments/user/${id}`);
};

const getPastAppointment = (id) => {
  return axiosClient.get(`appointments/user/${id}/finished`);
};

export { getAppointment, getPastAppointment };
