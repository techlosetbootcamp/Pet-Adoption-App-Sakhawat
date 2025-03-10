import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/rootStackParamList';
import useFavorites from '../../hooks/useFavorite';
import Card from '../../components/card/Card';
import { Pet } from '../../types/pets';

const FavoritesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const favoritePets = useFavorites();

  const handleNavigate = (pet:Pet) => {
    navigation.navigate('PetDetails', { petId: pet.id }); 
  };

  const renderItem = ({ item }: { item:Pet }) => (
    <Card onPress={() => handleNavigate(item)}>
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <View style={styles.infoContainer}>
                   <Text style={styles.petName}>{item.name}</Text>
                   <Text>Age {item.age} Months</Text>
                   <Text>{item.location}   <Ionicons name="location-outline" size={14} color="red" /></Text>
               <Text>{item.gender} </Text>
      
                 </View>
      <Ionicons name="heart" size={20} color="red" style={styles.heartIcon} />
    </Card>
  );

  return (
    <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Favorites</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Ionicons name="add" size={30} style={styles.headerIcon} />
      </TouchableOpacity>
  </View>

    {favoritePets.length > 0 ? (
        <FlatList
          data={favoritePets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorite pets yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 10, },
  
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  header: { fontSize: 24, fontWeight: 'bold' },

  headerIcon: {
    position: 'absolute',
    right: 10,
  },

  

  petImage: {
    width: 190,
    height: 170,
    borderRadius: 10,
    top:-40,
    left: -13,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  heartIcon: { padding: 10,
    top:70,
   },

  noFavorites: { fontSize: 18, color: '#888', textAlign: 'center', marginTop: 20 },
});

export default FavoritesScreen;
