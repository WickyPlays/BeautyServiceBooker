import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { aget } from '../../commons/util_axios';
import {styles} from './HomeScreen.style.js';

const HomeScreen = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    aget('/services')
      .then((response) => {
        setServices(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });
  }, []);

  const renderServiceType = (service) => (
    <TouchableOpacity
      key={service._id}
      style={styles.serviceTypeContainer}
      onPress={() => navigation.navigate('Detail', { itemId: service._id })}
    >
      <Image
        source={{ uri: service.image }}
        style={styles.serviceTypeImage}
      />
      <Text style={styles.serviceTypeText}>{service.name}</Text>
    </TouchableOpacity>
  );

  const filterServicesByGender = (gender) => {
    return services.filter((service) => service?.gender === gender);
  };

  const renderSection = (title, gender) => (
    <>
      <Text style={styles.servicesHeader}>{title}</Text>
      <FlatList
        data={filterServicesByGender(gender)}
        renderItem={({ item }) => renderServiceType(item)}
        keyExtractor={(item) => item._id}
        numColumns={3}
        contentContainerStyle={styles.servicesGrid}
      />
    </>
  );

  return (
    <View style={styles.container}>
      {/* Location */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Munich Center</Text>
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
        data={[]}
        renderItem={null}
        ListFooterComponent={
          <View style={styles.servicesContainer}>
            {renderSection('All Genders', 'both')}
            {renderSection('Male Services', 'male')}
            {renderSection('Female Services', 'female')}
          </View>
        }
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={true}
      />
    </View>
  );
};

export default HomeScreen;
