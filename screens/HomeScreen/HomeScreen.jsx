import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { styles } from "./HomeScreen.style.js";
import FemaleSalon from "../../assets/0e9e0e438c537d5139a55e274584893e.png";
import MaleSalon from "../../assets/istockphoto-640274128-612x612.jpg";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [shops, setShops] = useState([
    {
      id: "1",
      name: "Woodlands Hills Salon",
      type: "male",
      services: "Haircut, Spa, Massage",
      image: MaleSalon,
    },
    {
      id: "2",
      name: "Style Lounge Salon",
      type: "female",
      services: "Haircut, Spa, Massage",
      image: FemaleSalon,
    },
  ]);

  const handlePress = (shopType) => {
    navigation.navigate(shopType === "male" ? "maleshop" : "femaleShop");
  };

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ShopCard = ({ shop }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(shop.type)}>
        <View className="flex flex-col w-full h-[251px] shadow-lg mt-6">
          <Image
            source={shop.image}
            className="w-full h-[183.8px] rounded-lg"
          />
          <View className="flex flex-col pt-2">
            <Text className="text-[#8F90A6] font-bold text-[14px] leading-[16px]">
              {shop.type === "male" ? "For Men" : "For Women"}
            </Text>
            <View>
              <Text className="text-lg font-bold text-black">{shop.name}</Text>
              <Text className="text-[#8F90A6] font-bold text-[14px] leading-[16px]">
                {shop.services}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Location */}
      <View className="mt-20 mb-4 px-[16px] flex flex-row space-x-2">
        <IonIcons name="location" size={24} />
        <Text className="text-[20px]">Ho Chi Minh City</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <IonIcons name="search" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <IonIcons name="arrow-forward-outline" size={20} />
        </TouchableOpacity>
      </View>

      {/* Scrollable FlatList */}
      <FlatList
        data={filteredShops}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <View className="flex flex-col space-y-6 px-[16px] py-3">
            <View>
              <Text className="text-[20px] font-bold">Popular near you</Text>
            </View>
            {filteredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </View>
        }
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={true}
      />
    </View>
  );
};

export default HomeScreen;