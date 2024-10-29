import { StyleSheet } from "react-native";
import { commonStyles } from "../../commons/common_style";

export const styles = StyleSheet.create({
  ratingFilterContainer: {
    marginBottom: 10,
  },
  ratingFilter: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ratingButtonSelected: {
    backgroundColor: commonStyles.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ratingText: {
    fontSize: 16,
    color: "#555",
  },
  ratingTextSelected: {
    fontSize: 16,
    color: "white",
  },
  commentContainer: {
    marginTop: 20,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  comment: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  commentContent: {
    marginLeft: 10,
  },
  commentUsername: {
    fontWeight: "bold",
  },
  commentDate: {
    fontSize: 12,
    color: "#777",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: "#555",
  },
  addCommentContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  commentInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    minHeight: 50,
  },
  charCount: {
    alignSelf: "flex-end",
    marginBottom: 5,
    color: "#777",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  ratingStars: {
    flexDirection: "row",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: commonStyles.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  starRatingContainer: {
    marginBottom: 10,
  },
  starRatingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  starRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  deleteButton: {
    color: "red",
    marginTop: 5,
  },
});
