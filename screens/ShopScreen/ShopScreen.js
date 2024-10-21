import React, { useState, useCallback } from 'react';
import { View, Text, RefreshControl, StyleSheet, TouchableOpacity, Image, SectionList, ScrollView, Share, Linking, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ShopScreen.style';
import { ImageBackground } from 'react-native';

const data = {
  name: 'Woodlands Hills Salon',
  banner: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  rating: 4.1,
  ratingCount: '5k+',
  distance: '5.0 Kms',
  priceLevel: '$$',
  address: 'Keira throughway',
  servicesList: [
    { id: '1', name: 'Haircut', price: '$40', duration: '40 Mins', imageUrl: 'https://randomuser.me/api/portraits/men/30.jpg' },
    { id: '2', name: 'Body Massage', price: '$40', duration: '20 Mins', imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: '3', name: 'Active Detox Cleanup', price: '$40', duration: '10 Mins', imageUrl: 'https://randomuser.me/api/portraits/men/27.jpg' },
  ],
  packagesList: [
    { id: '1', name: 'Haircut & Shave', price: '$40', duration: '40 Mins', imageUrl: 'https://randomuser.me/api/portraits/men/25.jpg' },
    { id: '2', name: 'Haircut & Beard Grooming', price: '$40', duration: '40 Mins', imageUrl: 'https://randomuser.me/api/portraits/men/24.jpg' },
    { id: '3', name: 'Haircut & Anti-Pollution Cleanup', price: '$40', duration: '40 Mins', imageUrl: 'https://randomuser.me/api/portraits/men/23.jpg' },
  ],
  promoList: [
    { id: '1', code: 'FREE50', discountPrice: '50% off' },
    { id: '2', code: 'DEBIT60', discountPrice: '60% off on Debit Card' },
  ],
  tabs: [
    { id: '1', title: 'Recommended' },
    { id: '2', title: 'Packages' },
    { id: '3', title: 'Face Care' },
  ],
};

export default function ShopScreen({navigation}) {

  const [refreshing, setRefreshing] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out Woodlands Hills Salon! Great services and packages. ⭐ 4.1 (5k+ ratings)',
      });
    } catch (error) {
      alert('Error sharing');
    }
  };

  const handleSearch = () => {
    navigation.navigate('SearchScreen');
  }

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{item.name}</Text>
        <View style={styles.serviceDetails}>
          <Ionicons name="pricetag-outline" size={16} color="#000" />
          <Text style={styles.serviceText}>{item.price}</Text>
        </View>
        <View style={styles.serviceDetails}>
          <Ionicons name="time-outline" size={16} color="#000" />
          <Text style={styles.serviceText}>{item.duration}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.selectButton}>
        <Text style={styles.selectText}>Select</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPromoItem = (promo) => (
    <View style={styles.promoItem}>
      <Text style={styles.promoCode}>{promo.code}</Text>
      <Text style={styles.promoDiscount}>{promo.discountPrice}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          { title: 'Recommended Services', data: data.servicesList },
          { title: 'Packages', data: data.packagesList },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        ListHeaderComponent={() => (
          <>
            {/* Header Section */}
            <View style={styles.header}>
              <ImageBackground
                resizeMode="cover"
                source={{ uri: data.banner }}
                style={styles.headerImage}
              />
              <View style={styles.headerImageOverlay}>
                <View style={styles.headerContent}>
                  <Text style={styles.salonName}>{data.name}</Text>
                  <Text style={styles.salonDetails}>{data.address} • {data.distance} • {data.priceLevel}</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.headerActionsContainer}>
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.headerActionsButtons} onPress={handleCall}>
                  <Ionicons name="call-outline" size={24} color="black" />
                  <Text>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerActionsButtons}>
                  <Ionicons name="navigate-outline" size={24} color="black" />
                  <Text>Directions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerActionsButtons} onPress={handleShare}>
                  <Ionicons name="share-social-outline" size={24} color="black" />
                  <Text>Share</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {data.rating}</Text>
                <Text style={styles.ratingCount}>{data.ratingCount} ratings</Text>
              </View>
            </View>

            {/* Promo Section */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data.promoList}
              style={styles.promoList}
              renderItem={({ item }) => renderPromoItem(item)}
              keyExtractor={(item) => item.id}
            />

            {/* Tabs Section */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data.tabs}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.tab}>
                  <Text style={styles.tabText}>{item.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />


      {scrollY > 100 && (
        <View style={styles.fixedHeader}>
          <Text></Text>
          <Text style={styles.fixedHeaderTitle}>{data.name}</Text>
          <Ionicons name="search" size={24} color="black" />
        </View>
      )}
    </View>
  );
}
