import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { toggleFavorite } from '../../redux/slices/favoritesSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { adoptedPet } from '../../redux/slices/adoptedPetSlice';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/rootStackParamList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import useUserDetails from '../../hooks/usePetDetails';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import { Pet } from '../../types/pets';
import { AdoptionRequest } from '../../types/adoptionRequest';

type PetDetailsRouteProp = RouteProp<RootStackParamList, 'PetDetails'>;

const PetDetails = () => {
  const route = useRoute<PetDetailsRouteProp>();
  const { petId } = route.params;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  
  useEffect(() => {
    const user = auth().currentUser;
  }, []);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {

        const petDoc = await firestore().collection('pets').doc(petId).get();
        if (petDoc.exists) {

          setSelectedPet(petDoc.data() as Pet);
        }
      } catch (error) {
      }
    };
    fetchPetDetails();
  }, [petId]);

  const userFavorites = useAppSelector((state) => state.auth.user?.favorites || []);

  useEffect(() => {
    setIsFavorite(userFavorites.includes(petId));
  }, [userFavorites, petId]);

  const userId = selectedPet?.userId ?? '';
  const { user: owner } = useUserDetails(userId);
  
  
  
  const handleAdoptNowPress = async () => {
    const user = auth().currentUser;
  
    if (!user) {
      return;
    }
  
    try {
      const petRef = firestore().collection('pets').doc(petId);

      const petSnapshot = await petRef.get();
      if (!petSnapshot.exists) {
        return;
      }
      
      const petData = petSnapshot.data(); 
      if (!petData) {
        return;
      }
      
      
      await petRef.update({
        adoptedBy: petData.adoptedBy ? firestore.FieldValue.arrayUnion(user.uid) : [user.uid],
        adoptionDate: new Date().toISOString(),
      });
  
      const adoptionRequest: AdoptionRequest = {
        adopterName: user.displayName || 'Unknown',
        adopterImage: user.photoURL || '',
        adopterEmail: user.email || 'No Email',
        adopterLocation: 'Unknown',
        petName: petData.name,
        petType: petData.type,
        adoptionDate: new Date().toISOString(),
      };
  
      dispatch(adoptedPet(adoptionRequest));
  
      setSelectedPet((prev) =>
        prev ? { ...prev, adoptedBy: [...(prev.adoptedBy || []), user.uid] } : null
      );
  
    } catch (error) {
    }
  };
  
  
  const handleFavoritePress = async () => {
    const user = auth().currentUser;
    if (!user) return;
  
    const userRef = firestore().collection('users').doc(user.uid);
    try {
      if (isFavorite) {
        await userRef.update({
          favorites: firestore.FieldValue.arrayRemove(petId),
        });
      } else {
        await userRef.update({
          favorites: firestore.FieldValue.arrayUnion(petId),
        });
      }
  
      dispatch(toggleFavorite(petId));
      setIsFavorite((prev) => !prev);
    } catch (error) {
    }
  };

  if (!selectedPet) {
    return (
      <View style={styles.container}>
        <Text>Loading pet details...</Text>
      </View>
    );
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#FFFFFF" style={styles.backIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavoritePress}>
        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={30} color={isFavorite ? 'red' : 'black'} />
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
            <Text>{selectedPet.vaccinated ? 'Yes' : 'No'}</Text>
          </View>
        </View>

        <View style={styles.ownerInfo}>
          {owner?.photoURL && <Image source={{ uri: owner.photoURL }} style={styles.ownerImage} />}
          <Text style={styles.ownerName}>{owner?.username || 'Unknown User'}</Text>
          <Text style={styles.ownerRole}>Owner</Text>
        </View>

        <Text style={styles.description}>{selectedPet.description}</Text>
        <Text style={styles.location}>
          {selectedPet.location} <Ionicons name="location-outline" size={20} color="red" />
        </Text>

        <TouchableOpacity style={styles.adoptButton} onPress={handleAdoptNowPress}>
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  petName: { fontSize: 28, fontWeight: 'bold', top: 30 },
  price: {
    fontSize: 30,
    color: '#ff9800',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginLeft: 'auto',
  },
  type: { fontSize: 15, color: '#666',  top: -13},
  infoContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  infoBox: {
    backgroundColor: '#fdebd0',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: { fontSize: 12, fontWeight: 'bold', marginBottom: 3, color: '#ff9800' },
  ownerInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  ownerName: { fontSize: 16, top: -10, fontWeight: 'bold' },
  ownerRole: { fontSize: 14, color: '#888', left: -60, top: 10 },
  description: { fontSize: 18, color: '#555', marginBottom: 20 },
  ownerImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  location: {
    top: 220,
    alignSelf: 'flex-end',
    textAlign: 'right',
    right: 20,
    position: 'absolute',
    fontSize: 15,
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
  backIcon: { top: 20, left: 20 },
});

export default PetDetails;
