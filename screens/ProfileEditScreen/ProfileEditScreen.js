import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, Image, StyleSheet } from 'react-native';
import sha256 from 'crypto-js/sha256';
import Toast from 'react-native-toast-message';
import { aget, aupdate } from '../../commons/util_axios';
import { styles } from './ProfileEditScreen.style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileEditScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await aget('/whois/profile');
        let data = response.data;
        setProfile(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to load profile data' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if (password && password !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Passwords do not match' });
      return;
    }
    setUpdating(true);
    await aupdate('/whois/profile', { name, email, phone, password: password || undefined, confirmPassword: confirmPassword || undefined })
      .then((response) => {
        if (response.status === 200) {
          Toast.show({ type: 'success', text1: 'Success', text2: 'Profile updated successfully' });
        }
      })
      .catch((error) => {
        let message = error.response?.data?.message || 'Error updating profile';
        Toast.show({ type: 'error', text1: 'Error', text2: message });
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: `https://www.gravatar.com/avatar/${sha256(email).toString()}?s=300&d=identicon` }} style={styles.avatar} />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter your email"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Enter your phone number"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setShowConfirmPassword(text.length > 0);
          }}
          secureTextEntry
          placeholder="Enter a new password"
        />

        {showConfirmPassword && (
          <>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm your password"
            />
          </>
        )}
        <TouchableOpacity
          style={styles.buttonUpdate}
          onPress={handleUpdate}
          disabled={updating}
        >
          <Text style={styles.buttonUpdateText}>{updating ? 'Updating...' : 'Update'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileEditScreen;
