import React from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import Search from '../../components/searchbar/Searchbar';
import {useSearch} from '../../hooks/useSearch';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/rootStackParamList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from '../../redux/store';
import Card from '../../components/card/Card';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {RootState} from '../../redux/store';
import {FIREBASE_COLLECTIONS} from '../../constants/firebase';
import {COLORS} from '../../constants/colors';
import {searchStyles} from '../../styles/search';

const filters = ['Dog', 'Cat', 'Bunny', 'Bird', 'Turtle'];

export default function SearchScreen() {
  const {results, loading, error, searchPets, handleClick} = useSearch();
  const selectedFilter =
    useAppSelector((state: RootState) => state.adoptedPet.selectedPet?.type) ||
    null;
  const userFavorites = useAppSelector(
    state => state.auth.user?.favorites || [],
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSearch = (searchText: string) => {
    searchPets(searchText, selectedFilter || '');
  };

  const handleFavoritePress = async (petId: string) => {
    const user = auth().currentUser;
    if (!user) return;

    try {
      const petRef = firestore()
        .collection(FIREBASE_COLLECTIONS.pets)
        .doc(petId);
      const petSnapshot = await petRef.get();
      if (!petSnapshot.exists) return;

      const isCurrentlyFavorite = userFavorites.includes(petId);

      const updatedFavorites = isCurrentlyFavorite
        ? userFavorites.filter(id => id !== petId)
        : [...userFavorites, petId];

      await firestore()
        .collection(FIREBASE_COLLECTIONS.users)
        .doc(user.uid)
        .update({
          favorites: updatedFavorites,
        });
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <View style={searchStyles.container}>
      <Search onSearch={handleSearch} />

      <View style={searchStyles.filterContainer}>
        {filters?.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              searchStyles.filterButton,
              selectedFilter === item && searchStyles.activeFilter,
            ]}
            onPress={() => handleClick(item)}>
            <Text
              style={[
                searchStyles.filterText,
                selectedFilter === item && searchStyles.activeFilterText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && <ActivityIndicator size="large" color={COLORS.blue} />}
      {error && <Text style={searchStyles.errorText}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card
            onPress={() =>
              navigation.navigate('PetDetails', {petId: item?.id})
            }>
            <Image source={{uri: item?.image}} style={searchStyles.petImage} />

            <View style={searchStyles.infoContainer}>
              <Text style={searchStyles.petName}>{item?.name}</Text>
              <Text>Age {item?.age} Months</Text>
              <Text>
                {item?.location}
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={COLORS.red}
                />
              </Text>
              <Text>{item?.gender}</Text>
            </View>

            <TouchableOpacity
              style={searchStyles.favoriteIcon}
              onPress={() => handleFavoritePress(item?.id)}>
              <Ionicons
                name={
                  userFavorites.includes(item?.id) ? 'heart' : 'heart-outline'
                }
                size={30}
                color={
                  userFavorites.includes(item?.id) ? COLORS.red : COLORS.black
                }
              />
            </TouchableOpacity>
          </Card>
        )}
      />
    </View>
  );
}
