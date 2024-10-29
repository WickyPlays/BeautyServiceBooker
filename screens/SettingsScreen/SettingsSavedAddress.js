import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsSavedAddress() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigation = useNavigation();

  const addresses = [
    { id: 1, label: 'Home', address: '3944 Water Street, Walnut Creek, California' },
    { id: 2, label: 'Work', address: '3944 Water Street, Walnut Creek, California' },
  ];

  const handleDeletePress = (address) => {
    setSelectedAddress(address);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Saved Addresses</Text>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="add" size={28} color="black" />
        </TouchableOpacity>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addressText: {
    fontSize: 14,
    color: '#7d7d7d',
    marginLeft: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: 10,
  },
  editButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  deleteButtonModal: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    flex: 1,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
