import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchProps {
  onSearch: (searchText: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a pet"
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Icon name="arrow-forward-circle-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -120,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    left:14,

  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Search;
