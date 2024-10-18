import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 8,
  },
  backButton: {
    flexShrink: 0,
    marginRight: 10,
  },
  searchBarWrapper: {
    flexGrow: 1,
  },
  searchResultContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchResultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchResultDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearchTextChange = text => setSearchQuery(text);

  const handleSearchConfirm = () => {
    setLoading(true);
    fetch(`https://my-json-server.typicode.com/typicode/demo/search?q=${searchQuery}`)
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        setSearchResults(responseJson);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.searchBarWrapper}>
          <SearchBar
            searchQuery={searchQuery}
            handleSearchTextChange={handleSearchTextChange}
            handleSearchConfirm={handleSearchConfirm}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <View style={styles.searchResultContainer}>
              <Text style={styles.searchResultTitle}>{item.title}</Text>
              <Text style={styles.searchResultDescription}>
                {item.description}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};
