import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Search from '../../components/searchbar/Searchbar';
import { useSearch } from '../../hooks/useSearch';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/rootStackParamList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../../hooks/useSelector';
import Card from '../../components/card/Card';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { RootState } from '../../redux/store';

const filters = ['Dog', 'Cat', 'Bunny', 'Bird', 'Turtle'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { results, loading, error, searchPets, handleClick } = useSearch();
  const selectedFilter = useAppSelector((state: RootState) => state.adoptedPet.selectedPet?.type) || null;
  const userFavorites = useAppSelector((state) => state.auth.user?.favorites || []);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSearch = (searchText: string) => {
    setQuery(searchText);
    searchPets(searchText, selectedFilter || '');
  };

  const handleFavoritePress = async (petId: string) => {
    const user = auth().currentUser;
    if (!user) return;

    try {
      const petRef = firestore().collection('pets').doc(petId);
      const petSnapshot = await petRef.get();
      if (!petSnapshot.exists) return;

      const petData = petSnapshot.data();
      const isCurrentlyFavorite = userFavorites.includes(petId);

      const updatedFavorites = isCurrentlyFavorite
        ? userFavorites.filter((id) => id !== petId)
        : [...userFavorites, petId];

      await firestore().collection('users').doc(user.uid).update({
        favorites: updatedFavorites,
      });

    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Search onSearch={handleSearch} />

      <View style={styles.filterContainer}>
        {filters?.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              selectedFilter === item && styles.activeFilter,
            ]}
            
            onPress={() => handleClick(item)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('PetDetails', { petId: item.id })}>
            <Image source={{ uri: item.image }} style={styles.petImage} />
            
            <View style={styles.infoContainer}>
              <Text style={styles.petName}>{item.name}</Text>
              <Text>Age {item.age} Months</Text>
              <Text>
                {item.location} <Ionicons name="location-outline" size={14} color="red" />
              </Text>
              <Text>{item.gender}</Text>
            </View>

            <TouchableOpacity
              style={styles.favoriteIcon}
              onPress={() => handleFavoritePress(item.id)}
            >
              <Ionicons
                name={userFavorites.includes(item.id) ? 'heart' : 'heart-outline'}
                size={30}
                color={userFavorites.includes(item.id) ? 'red' : 'black'}
              />
            </TouchableOpacity>
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
    top: -30,
    left: -15,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,

  },
  favoriteIcon: { position: 'absolute',  right: 20, top: 80 },

  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});