import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, RefreshControl, StyleSheet, TouchableOpacity, Image, SectionList, Share, Linking, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ShopScreen.style';
import { ImageBackground } from 'react-native';
import { getServices } from '../../api/services'; // Import the API function

export default function ShopScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all'); // Set default tab to "All"
  const [services, setServices] = useState([]);
  const [sections, setSections] = useState([]);
  const [tabs, setTabs] = useState([
    { id: 'all', title: 'All' }, // Add "All" tab
    { id: 'barber', title: 'Barber' },
    { id: 'facial', title: 'Facial' },
    { id: 'massage', title: 'Massage' },
    { id: 'hair care', title: 'Hair Care' },
    { id: 'package', title: 'Package' },
  ]);

  // Static data
  const salonData = {
    name: 'Woodlands Hills Salon',
    banner: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.1,
    ratingCount: '5k+',
    distance: '5.0 Kms',
    priceLevel: '$$',
    address: 'Keira throughway',
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedTab === 'all') {
      groupServicesByType();
    } else {
      filterServices();
    }
  }, [selectedTab, services]);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      if (Array.isArray(response.data)) {
        const filteredServices = response.data.filter(service => service.gender === 'male' || service.gender === 'both');
        setServices(filteredServices);
      } else {
        console.error('API response is not an array:', response.data);
        setServices([]);
      }
    } catch (error) {
      console.error('Error fetching services:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      setServices([]); // Ensure services is always an array
    }
  };

  const groupServicesByType = () => {
    if (!Array.isArray(services)) {
      console.error('Services is not an array:', services);
      setSections([]);
      return;
    }

    const groupedServices = tabs
      .filter(tab => tab.id !== 'all')
      .map(tab => ({
        title: tab.title,
        data: services.filter(service => service.type === tab.id),
      }));

    setSections(groupedServices);
  };

  const filterServices = () => {
    if (!Array.isArray(services)) {
      console.error('Services is not an array:', services);
      setSections([]);
      return;
    }
    const filtered = services.filter(service => service.type === selectedTab);
    setSections([{ title: capitalizeFirstLetter(selectedTab), data: filtered }]);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchServices().finally(() => setRefreshing(false));
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

  const handleDirections = () => {
    // Implement directions functionality here
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{item.name}</Text>
        <View style={styles.serviceDetails}>
          <Ionicons name="pricetag-outline" size={16} color="#000" />
          <Text style={styles.serviceText}>${item.price}</Text>
        </View>
        <View style={styles.serviceDetails}>
          <Ionicons name="time-outline" size={16} color="#000" />
          <Text style={styles.serviceText}>{item.duration} mins</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.selectButton}>
        <Text style={styles.selectText}>Select</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item._id}
        renderItem={renderServiceItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{capitalizeFirstLetter(title)}</Text>
        )}
        ListHeaderComponent={() => (
          <>
            {/* Header Section */}
            <View style={styles.header}>
              <ImageBackground
                resizeMode="cover"
                source={{ uri: salonData.banner }}
                style={styles.headerImage}
              />
              <View style={styles.headerImageOverlay}>
                <View style={styles.headerContent}>
                  <Text style={styles.salonName}>{salonData.name}</Text>
                  <Text style={styles.salonDetails}>{salonData.address} • {salonData.distance} • {salonData.priceLevel}</Text>
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
                <TouchableOpacity style={styles.headerActionsButtons} onPress={handleDirections}>
                  <Ionicons name="navigate-outline" size={24} color="black" />
                  <Text>Directions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerActionsButtons} onPress={handleShare}>
                  <Ionicons name="share-social-outline" size={24} color="black" />
                  <Text>Share</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {salonData.rating}</Text>
                <Text style={styles.ratingCount}>{salonData.ratingCount} ratings</Text>
              </View>
            </View>

            {/* Draggable Tabs */}
            <View style={styles.tabsContainer}>
              <FlatList
                data={tabs}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.tab, selectedTab === item.id && styles.tabActive]}
                    onPress={() => setSelectedTab(item.id)}
                  >
                    <Text style={[styles.tabText, selectedTab === item.id && styles.tabTextActive]}>
                      {capitalizeFirstLetter(item.title)}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

          </>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}