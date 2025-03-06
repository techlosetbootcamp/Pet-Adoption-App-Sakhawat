import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
// import { red } from 'react-native-reanimated/lib/typescript/Colors';

interface SearchProps {
  onSearch: (searchText: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={{...styles.container, height:56, zIndex: 20}}>
      <TextInput
        style={styles.input}
        placeholder="Search for a pet"
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
<Ionicon name="search" size={25} color={'white'} />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3FA',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#33',
    left:4,
  },
  button: {
    position: 'absolute',
    right: 0,
    top: 23,
    transform: [{ translateY: -25 }],
    backgroundColor: 'black',
    borderRadius: 20,
        alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 70,
  },
});

export default Search;
