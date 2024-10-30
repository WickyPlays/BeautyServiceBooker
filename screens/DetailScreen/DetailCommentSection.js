import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { Divider } from "react-native-elements";
import { renderStars } from "../../commons/common_style";
import { styles } from "./DetailCommentSection.style";
import useAuthStore from "../../commons/authenStore";
import { apost, adelete } from "../../commons/util_axios";
import Toast from 'react-native-toast-message';

export default function DetailCommentSection({ itemId, comments, setComments, filteredComments, setFilteredComments, selectedRating, setSelectedRating, refreshComments, serviceId }) {
  const { user } = useAuthStore();
  const userID = user._id;

  const [newComment, setNewComment] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [selectedRatingForm, setSelectedRatingForm] = useState(null);

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating);
    if (rating === null) {
      setFilteredComments(comments);
      return;
    }
    const filtered = comments.filter(comment => comment.rating === rating);
    setFilteredComments(filtered);
  };

  const handleSendComment = async () => {
    if (newComment.trim() === "") return;

    const commentData = {
      rating: selectedRatingForm,
      content: newComment,
    };

    try {
      const response = await apost(`/services/comments/${itemId}`, commentData);
      if (response.status === 201) {
        refreshComments();
        Toast.show({
          text1: 'Comment Sent',
          text2: response.data.message || "Your comment has been submitted.",
          type: 'success',
        });
      }
      setNewComment("");
      setCharCount(0);
    } catch (error) {
      Toast.show({
        text1: 'Error Sending Comment',
        text2: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete this comment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const response = await adelete(`/services/comments/${itemId}/${commentId}`);
              if (response.status === 200) {
                refreshComments();
                Toast.show({
                  text1: 'Comment Deleted',
                  text2: response.data.message || "The comment has been deleted.",
                  type: 'success',
                });
              }
            } catch (error) {
              Toast.show({
                text1: 'Error Deleting Comment',
                text2: error.response?.data?.message || error.message,
                type: 'error',
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.commentTitle}>Comment</Text>
        <TextInput
          style={styles.textInput}
          value={newComment}
          onChangeText={(text) => {
            setNewComment(text);
            setCharCount(text.length);
          }}
          placeholder="Write a comment..."
          maxLength={750}
        />
        <Text style={styles.charCount}>{charCount}/750</Text>
        <View style={styles.starRatingContainer}>
          <Text style={styles.starRatingText}>Selected rating:</Text>
          <View style={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setSelectedRatingForm(star)}
              >
                <Ionicons
                  name={selectedRatingForm >= star ? "star" : "star-outline"}
                  size={24}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendComment}
          disabled={charCount === 0}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ratingFilterContainer}>
        <View style={styles.ratingFilter}>
          <TouchableOpacity
            style={selectedRating === null ? styles.ratingButtonSelected : styles.ratingButton}
            onPress={() => handleRatingFilter(null)}
          >
            <Text style={selectedRating === null ? styles.ratingTextSelected : styles.ratingText}>
              Show all
            </Text>
          </TouchableOpacity>
          {[1, 2, 3, 4, 5].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={selectedRating === rating ? styles.ratingButtonSelected : styles.ratingButton}
              onPress={() => handleRatingFilter(rating)}
            >
              <Text style={selectedRating === rating ? styles.ratingTextSelected : styles.ratingText}>
                {rating}
              </Text>
              <Ionicons
                name="star"
                size={16}
                color={selectedRating === rating ? "#FFD700" : "gray"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.commentContainer}>
        <Text style={styles.commentHeader}>Customer Reviews ({comments.length})</Text>
        {filteredComments.map((comment) => (
          <View key={comment.id} style={styles.comment}>
            <Avatar source={{ uri: comment.avatar }} rounded />
            <View style={styles.commentContent}>
              <Text style={styles.commentUsername}>{comment.username}</Text>
              {renderStars(comment.rating)}
              <Text style={styles.commentDate}>{comment.date}</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
              {comment.userID === userID && (
                <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
