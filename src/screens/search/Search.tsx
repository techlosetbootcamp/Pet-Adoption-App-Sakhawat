import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Search from '../../components/search/Searchbar'; // Ensure correct path
import {useSearch} from '../../hooks/useSearch';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useNavigation, NavigationProp} from '@react-navigation/native'; // Import useNavigation and NavigationProp
import {RootStackParamList} from '../../navigations/RootStackParamList'; // Import RootStackParamList
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../../hooks/useSelector';
import Card from '../../components/cards/Card';
const filters = ['Dog', 'Cat', 'Bunny', 'Bird', 'Turtle'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const {results, loading, error, searchPets, handleClick} = useSearch();
  const selectedFilter = useAppSelector(
    (state) => state.Filter.category,
  );
   const userFavorites = useSelector((state: RootState) => state.auth.user?.favorites);
    const [isFavorite, setIsFavorite] = useState(false);
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Initialize navigation with type


  
  const handleSearch = (searchText: string) => {
    -setQuery(searchText);
    searchPets(searchText, selectedFilter); // Filter by selected category
  };
  

  return (
    <View style={styles.container}>
      
      <Search onSearch={handleSearch} />
      
      <View style={styles.filterContainer}>
        {filters.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              selectedFilter === item && styles.activeFilter,
            ]}
            onPress={() => handleClick(item)}>
            <Text
              style={[
                styles.filterText,
                selectedFilter === item && styles.activeFilterText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display Results */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          
          
          
          
          
          <Card
          onPress={() => navigation.navigate('PetDetails', {petId: item.id})} // Navigate to PetDetails
          >
         <View style={styles.petImage}>
        <Image source={{ uri: item.image }} style={styles.petImage} />
      </View>

            {/* Pet Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.petName}>{item.name}</Text>
              <Text>Age {item.age} Months</Text>
              <Text>{item.location}<Ionicons name="location-outline" size={14} color="red" /></Text>
          <Text>{item.gender} </Text>
 
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 130,
    padding: 16,

  },
  filterContainer: {
    flexDirection: 'row',
    // top: -30,
  },
  filterButton: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#EEE',
    top: -60,
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: '#FFB830',
  },
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  activeFilterText: {
    color: '#fff',
  },
  petImage: {
    width: 190,
    height: 170,
    borderRadius: 10,
    top: -16,
    left: -5,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});