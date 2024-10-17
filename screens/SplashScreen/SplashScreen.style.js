import { StyleSheet } from "react-native";
import { commonStyles } from "../../commons/common_style";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    subTitle: {
      fontSize: 18,  
      color: commonStyles.primary,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
      color: commonStyles.primary,
    },
    footer: {
      position: "absolute",
      bottom: 25,
      fontSize: 14,
      color: "black",
    },
  });
  