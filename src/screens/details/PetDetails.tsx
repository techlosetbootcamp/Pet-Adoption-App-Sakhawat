import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { toggleFavorite } from '../../redux/slices/favoritesSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { adoptPet } from '../../redux/slices/adoptedPetsSlice';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootStackParamList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import useUserDetails from '../../hooks/usePetDetails'; // Import the custom hook

type PetDetailsRouteProp = RouteProp<RootStackParamList, 'PetDetails'>;

const PetDetails = () => {
  const route = useRoute<PetDetailsRouteProp>();
  const { petId } = route.params;
  const dispatch = useDispatch<typeof store.dispatch>();

  const selectedPet = useSelector((state: RootState) =>
    state.petDonation.pets.find(pet => pet.id === petId),
  );

  const userFavorites = useSelector((state: RootState) => state.user.user?.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  // Use the custom hook to fetch user details
  const { user: owner, loading: ownerLoading, error: ownerError } = useUserDetails(selectedPet?.id || '');

  const navigation = useNavigation();


  useEffect(() => {
    if (userFavorites && petId) {
      setIsFavorite(userFavorites.includes(petId));
    }
  }, [userFavorites, petId]);

  if (!selectedPet) {
    return (
      <View style={styles.container}>
        <Text>No pet selected or loading...</Text>
      </View>
    );
  }

   const handleAdoptNowPress = async () => {
    const user = auth().currentUser;
    
    if (user && selectedPet) {
      const userId = user.uid;
  
      dispatch(adoptPet(selectedPet.id));
  
      try {
        const petRef = firestore().collection('pets').doc(selectedPet.id);
        await petRef.update({
          adoptedBy: firestore.FieldValue.arrayUnion(userId),
        });
        console.log(`User ${userId} adopted pet ${selectedPet.name}`);      } catch (error) {
        console.error('Error updating adoption in Firestore:', error);
      }
    }
  };

  const updateFavoritesInFirebase = async (petId: string, userId: string) => {
    try {
      const userRef = firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const currentFavorites = userDoc.data()?.favorites || [];
        let updatedFavorites;

        if (currentFavorites.includes(petId)) {
          updatedFavorites = currentFavorites.filter((id: string) => id !== petId);
        } else {
          updatedFavorites = [...currentFavorites, petId];
        }

        await userRef.update({ favorites: updatedFavorites });
        console.log('Favorites updated in Firebase');
      }
    } catch (error) {
      console.error('Error updating favorites in Firebase: ', error);
    }
  };

  const handleFavoritePress = (_petId: string) => {
    const userId = auth().currentUser;
    if (_petId && userId?.uid) {
      dispatch(toggleFavorite(_petId));
      setIsFavorite(!isFavorite);
      updateFavoritesInFirebase(_petId, userId.uid);
    }
  };
console.log(owner)
  return (
    <ScrollView contentContainerStyle={styles.container}>
<TouchableOpacity onPress={() => navigation.goBack()}>
  <Ionicons name="arrow-back" size={30} color="#FFFFFF" style={styles.backIcon} />
</TouchableOpacity>
<TouchableOpacity style={styles.favoriteIcon} onPress={() => handleFavoritePress(selectedPet.id)}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={30}
          color={isFavorite ? 'red' : 'black'}
        />
      </TouchableOpacity>
      <View style={styles.petCard}>
        <Text style={styles.petName}>{selectedPet.name}</Text>
        <Text style={styles.price}>${selectedPet.amount}</Text>
        <Text style={styles.type}>{selectedPet.type}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text>{selectedPet.age}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text>{selectedPet.gender}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text>{selectedPet.weight} kg</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Vaccine</Text>
            <Text>{selectedPet.Vaccinated ? 'Yes' : 'No'}</Text>
          </View>
        </View>

        <View style={styles.ownerInfo}>
          {owner?.photoURL && (
            <Image source={{ uri: owner.photoURL }} style={styles.ownerImage} />
          )}
          <Text style={styles.ownerName}>{owner?.username || 'Unknown User'}</Text>
          <Text style={styles.ownerRole}>Owner</Text>
        </View>

        <Text style={styles.description}>{selectedPet.description}</Text>
<Text style={styles.location}>{selectedPet.location}<Ionicons name="location-outline" size={14} color="red" /></Text>

        <TouchableOpacity
          style={styles.adoptButton}
          onPress={handleAdoptNowPress}>
          <Text style={styles.adoptButtonText}>Adopt Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#C4C4C4' },
  petCard: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: 450,
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 40, // Keeps top-left rounded
    borderTopRightRadius: 40, // Keeps top-right rounded
    borderBottomLeftRadius: 0, // Removes bottom-left radius
    borderBottomRightRadius: 0, // Removes bottom-right radius
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
},
  petName: { fontSize: 28, fontWeight: 'bold',top:30, },
  price: {
    fontSize: 30,
    color: '#ff9800',
    fontWeight: 'bold',
    alignSelf: 'flex-end',  // Moves it to the end of its container
    textAlign: 'right',  // Align text to the right
    marginLeft: 'auto',  // Pushes it to the right
  },  
  type: { fontSize: 20, color: '#666', left:5, },
  infoContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  infoBox: {
    backgroundColor: '#fdebd0',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: { fontSize: 12, fontWeight: 'bold', marginBottom: 3, color: '#ff9800', },
  ownerInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  ownerName: { fontSize: 16,top:-10, fontWeight: 'bold' },
  ownerRole: { fontSize: 14, color: '#888', left:-80,top:10, },
  description: { fontSize: 18, color: '#555', marginBottom: 20 },
  ownerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    
  },
  location: {
    top: 220,
    alignSelf: 'flex-end', // Moves it to the right
    textAlign: 'right', // Ensures text aligns to the right
    right: 20, // Pushes it to the far right
    position: 'absolute',
    fontSize:20, // Ensures it stays in the right position
  },
  adoptButton: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    width: 250,
    alignSelf: 'center',
  },
  favoriteIcon: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
  adoptButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  backIcon:{
top:20,
left:20,
  }
});

export default PetDetails;
 