import { StyleSheet } from "react-native";
import { commonStyles } from "../../../commons/common_style";

export const styles = StyleSheet.create({
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
  bookingId: {
    color: "#808080",
    fontSize: 12,
  },
  bookingDescription: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  bookingStatus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginVertical: 8,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 5,
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
    borderTopWidth: 0.5,
    borderTopColor: "#00000057",
    paddingTop: 10,
  },
  reorderButton: {
    backgroundColor: commonStyles.primary,
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  reorderButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  descriptionText: {
    color: "#808080",
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  serviceImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 8,
  },
  priceText: {
    color: "#FF0000",
    fontWeight: "bold",
  },
  totalPriceText: {
    fontSize: 18,
  },
  totalPrice: {
    color: "#FF0000",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 20,
  },
});
