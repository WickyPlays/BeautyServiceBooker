import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from "./SettingsSavedAddress.style";

export default function SettingsSavedAddress() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({ label: '', address: '' });
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', address: '3944 Water Street, Walnut Creek, California' },
    { id: 2, label: 'Work', address: '3944 Water Street, Walnut Creek, California' },
  ]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setAddModalVisible(true)}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleDeletePress = (address) => {
    setSelectedAddress(address);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    setAddresses(addresses.filter(addr => addr.id !== selectedAddress.id));
    setModalVisible(false);
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    setNewAddress({ label: '', address: '' });
    setAddModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {addresses.map((address) => (
        <View key={address.id} style={styles.addressContainer}>
          <View style={styles.iconAndText}>
            <Ionicons name="home-outline" size={24} color="black" />
            <View>
              <Text style={styles.addressLabel}>{address.label}</Text>
              <Text style={styles.addressText}>{address.address}</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleDeletePress(address)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Delete "{selectedAddress?.label}" Address?</Text>
              <Text style={styles.modalText}>Are you sure you want to delete this address?</Text>
              <View style={styles.modalActions}>
                <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.deleteButtonModal} onPress={confirmDelete}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.addModalContainer}>
          <View style={styles.addModalContent}>
            <Text style={styles.modalTitle}>Add New Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Label (e.g., Home, Work)"
              value={newAddress.label}
              onChangeText={(text) => setNewAddress({ ...newAddress, label: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={newAddress.address}
              onChangeText={(text) => setNewAddress({ ...newAddress, address: text })}
            />
            <View style={styles.modalActions}>
              <Pressable style={styles.cancelButton} onPress={() => setAddModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={handleAddAddress}>
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
