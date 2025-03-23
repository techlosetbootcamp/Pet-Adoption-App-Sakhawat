import React, {useState} from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';
import {searchBarStyles} from '../../styles/searchBar';

interface SearchProps {
  onSearch?: (searchText: string) => void;
}

const Search: React.FC<SearchProps> = ({onSearch}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  return (
    <View style={{...searchBarStyles.container, height: 56, zIndex: 20}}>
      <TextInput
        style={searchBarStyles.input}
        placeholder="Search for a pet"
        placeholderTextColor={COLORS.mediumGray}
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={searchBarStyles.button} onPress={handleSearch}>
        <Ionicon name="search" size={25} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
