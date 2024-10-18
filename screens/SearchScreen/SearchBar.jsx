import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './SearchBar.style';
import { commonStyles } from '../../commons/common_style';

export default SearchBar = ({ searchQuery, handleSearchTextChange, handleSearchConfirm }) => {
	return (
		<View style={styles.searchContainer}>
			<Icon name="magnify" size={24} color={commonStyles.primary} style={styles.searchIcon} />

			<TextInput
				style={styles.textInput}
				value={searchQuery}
				onChangeText={handleSearchTextChange}
				placeholder="Search items..."
				placeholderTextColor="#888"
			/>

			<TouchableOpacity onPress={handleSearchConfirm}>
				<Icon name="arrow-right-circle" size={32} color={commonStyles.primary} style={styles.searchButton} />
			</TouchableOpacity>
		</View>
	);
};
