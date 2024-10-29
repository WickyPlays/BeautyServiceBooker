// Original styles after extraction
import { StyleSheet } from "react-native";
import { commonStyles } from "../../commons/common_style";

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
    backgroundColor: "#f9f9f9",
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 25,
  },
  fixedHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 10,
    marginTop: 30,
    zIndex: 10,
    padding: 8,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  homeButton: {
    position: "absolute",
    top: 0,
    right: 10,
    marginTop: 30,
    zIndex: 10,
    padding: 8,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  serviceDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
  },
  priceContainer: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  discountedPrice: {
    color: commonStyles.primary,
    fontSize: 22,
    fontWeight: "bold",
  },
  itemTool: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  divider: {
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderBadge: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  genderText: {
    color: '#FFF'
  },
  maleBadge: {
    backgroundColor: "#007bff",
  },
  femaleBadge: {
    backgroundColor: "#ff69b4",
  },
  bothBadge: {
    backgroundColor: "#333",
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bookButton: {
    backgroundColor: '#5e72eb',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  bookText: {
    color: '#fff',
  },

  bookedContainer: {
    flexDirection: 'row',
    gap: 10
  },

  bookButtonCancel: {
    backgroundColor: '#ff0000',
    color: '#fff',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingVertical: 10,
    gap: 5,
    borderRadius: 6,
    justifyContent: 'center'
  },

  bookButtonExist: {
    backgroundColor: '#ab9100',
    color: '#000000',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingVertical: 10,
    gap: 5,
    borderRadius: 6,
    justifyContent: 'center'
  }
});
