import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootStackParamList';
import useFavorites from '../../hooks/useFavorite';

const FavoritesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const favoritePets = useFavorites();

  const handleNavigate = (pet: any) => {
    navigation.navigate('PetDetails', { petId: pet.id }); // Pass pet ID
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleNavigate(item)} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <View style={styles.infoContainer}>
                   <Text style={styles.petName}>{item.name}</Text>
                   <Text>Age {item.age} Months</Text>
                   <Text>{item.location}<Ionicons name="location-outline" size={14} color="red" /></Text>
               <Text>{item.gender} </Text>
      
                 </View>
      <Ionicons name="heart" size={20} color="red" style={styles.heartIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Favorites</Text>
        <Ionicons name="add" size={30} style={styles.headerIcon} />
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
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  
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

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    height: 130,
    width: '100%',
    top:30,
  },

  petImage: {
    width: 190,
    height: 170,
    borderRadius: 10,
    top:-40,
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

  heartIcon: { padding: 10,
    top:70,
   },

  noFavorites: { fontSize: 18, color: '#888', textAlign: 'center', marginTop: 20 },
});

export default FavoritesScreen;
