import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/rootStackParamList';
import useFavorites from '../../hooks/useFavorite';
import Card from '../../components/card/Card';
import {Pet} from '../../types/pets';
import {COLORS} from '../../constants/colors';
import {favoriteStyles} from '../../styles/favorite';

const FavoritesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const favoritePets = useFavorites();

  const handleNavigate = (pet: Pet) => {
    navigation.navigate('PetDetails', {petId: pet.id});
  };

  const renderItem = ({item}: {item: Pet}) => (
    <Card onPress={() => handleNavigate(item)}>
      <Image source={{uri: item?.image}} style={favoriteStyles.petImage} />
      <View style={favoriteStyles.infoContainer}>
        <Text style={favoriteStyles.petName}>{item?.name}</Text>
        <Text>Age {item?.age} Months</Text>
        <Text>
          {item?.location}{' '}
          <Ionicons name="location-outline" size={14} color="red" />
        </Text>
        <Text>{item?.gender} </Text>
      </View>
      <Ionicons
        name="heart"
        size={20}
        color={COLORS.red}
        style={favoriteStyles.heartIcon}
      />
    </Card>
  );

  return (
    <View style={favoriteStyles.container}>
      <View style={favoriteStyles.headerContainer}>
        <Text style={favoriteStyles.header}>Favorites</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="add" size={30} style={favoriteStyles.headerIcon} />
        </TouchableOpacity>
      </View>

      {favoritePets.length > 0 ? (
        <FlatList
          data={favoritePets}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={favoriteStyles.noFavorites}>No favorite pets yet.</Text>
      )}
    </View>
  );
};

export default FavoritesScreen;
