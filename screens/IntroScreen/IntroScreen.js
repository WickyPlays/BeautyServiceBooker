import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { styles } from './IntroScreen.style'

const { width, height } = Dimensions.get('window');

const dataItems = [
  { id: 1, text: 'Schedule your Appointment with the best Hair Stylist in your Town.', image: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
  { id: 2, text: 'Get professional services at your convenience.', image: 'https://c.pxhere.com/photos/98/01/barber_barbershop_hair_stylist_haircut_hairdo_hairdresser_hairstylist_men-994115.jpg!d' },
  { id: 3, text: 'Experience the best salon care.', image: 'https://images.pexels.com/photos/3992879/pexels-photo-3992879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }
];

export default function IntroScreen({ navigation }) {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={true}
        data={dataItems}
        scrollAnimationDuration={1000}
        onScrollEnd={(index) => {
          setActiveSlide(index)
        }}
        renderItem={({ index }) => {
          let item = dataItems[index]
          return (
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.backgroundImage}
            >
              <View style={styles.imageCover}></View>
              <View style={styles.carouselItem}>
                <Text style={styles.carouselText}>{item.text}</Text>
              </View>
            </ImageBackground>
          )
        }}
      />
      <View style={styles.pagination}>
        {
          dataItems.map((d, i) => (
            <Text key={i} style={i == activeSlide ? styles.paginationDotActive : styles.paginationDot}></Text>
          ))
        }
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};