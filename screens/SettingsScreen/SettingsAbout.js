import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default SettingsAbout = () => {
  const menuItems = [
    { title: "Privacy", icon: "lock-closed-outline" },
    { title: "Terms of Services", icon: "document-text-outline" },
    { title: "Licenses", icon: "receipt-outline" },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <Ionicons name={item.icon} size={24} color="black" />
          <Text style={styles.menuText}>{item.title}</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" style={styles.chevronIcon} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
});
