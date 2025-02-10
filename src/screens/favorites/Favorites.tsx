import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/Ionicons';
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
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petDetails}>Age {item.age} Months</Text>
        <Text style={styles.petDetails}>{item.location}</Text>
        <Text style={styles.petDetails}>{item.gender}</Text>
      </View>
      <FontAwesome name="heart" size={20} color="red" style={styles.heartIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
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
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  petImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  petInfo: { flex: 1 },
  petName: { fontSize: 18, fontWeight: 'bold' },
  petDetails: { fontSize: 14, color: '#666' },
  heartIcon: { padding: 10 },
  noFavorites: { fontSize: 18, color: '#888', textAlign: 'center', marginTop: 20 },
});

export default FavoritesScreen;
