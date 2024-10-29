import { create } from "zustand";
import { getPastAppointment } from "../api/appointment.js";

const useBookingStore = create((set) => ({
  appointments: [],
  FetchAppointment: async (id) => {
    try {
      const response = await getPastAppointment(id);
      if(response && response.status === 200){
        set({ appointments: response.data || [] });
      }
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

export default useBookingStore;
