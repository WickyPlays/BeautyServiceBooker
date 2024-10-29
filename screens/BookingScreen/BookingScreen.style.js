import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#f8f8f8",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 16,
  },
  navbarTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    justifyContent: "space-around",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
  },
  tabText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  bookingItem: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingDescription: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  bookingStatus: {
    marginVertical: 8,
  },
  statusText: {
    color: "#808080", // Gray color
  },
  dot: {
    marginHorizontal: 4,
  },
  bookingFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  buttonRow_Past: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  buttonRow_Upcoming: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  reorderButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  reorderButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  cancelButtonText: {
    color: "#FF0000",
    fontSize: 14,
    textDecorationLine: "none",
    marginTop: 10,
  },
  descriptionText: {
    color: "#808080", // Gray color
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  serviceImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  datePickerButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  datePickerButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
