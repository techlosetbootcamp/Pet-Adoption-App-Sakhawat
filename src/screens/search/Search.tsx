import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchComponent from '../../components/search/Searchbar'; // Import the Search component

export default function SearchScreen() { // Rename the function for better clarity
  const handleSearch = (searchText: string) => {
    console.log('Search Text:', searchText);
  };

  return (
    <View style={styles.container}>
      <SearchComponent onSearch={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
});
