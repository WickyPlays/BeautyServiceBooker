import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export const commonStyles = {
    primary: '#6440fe'
}

export const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <Ionicons key={`full-${i}`} name="star" size={16} color="#FFD700" />
        );
    }

    if (hasHalfStar) {
        stars.push(
            <Ionicons key="half" name="star-half" size={16} color="#FFD700" />
        );
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < totalStars; i++) {
        stars.push(
            <Ionicons
                key={`empty-${i}`}
                name="star-outline"
                size={16}
                color="#FFD700"
            />
        );
    }

    return <View
        style={{
            flexDirection: "row",
            marginLeft: 5,
        }}>
        {stars}
    </View>;
};