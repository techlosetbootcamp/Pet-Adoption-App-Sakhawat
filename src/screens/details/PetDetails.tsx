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
import { useRoute } from '@react-navigation/native';
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
  container: { flexGrow: 1, backgroundColor: '#f5f5f5' },
  favoriteIcon: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
  petCard: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: 450,
    width: '100%',
    bottom: 0,
    borderRadius: 40,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  petName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  price: { fontSize: 22, color: '#ff9800', fontWeight: 'bold' },
  type: { fontSize: 16, color: '#666', marginBottom: 10 },
  infoContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  infoBox: {
    backgroundColor: '#fdebd0',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: { fontSize: 12, color: '#666', marginBottom: 3 },
  ownerInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  ownerName: { fontSize: 16, fontWeight: 'bold' },
  ownerRole: { fontSize: 14, color: '#888', marginLeft: 5 },
  description: { fontSize: 14, color: '#555', marginBottom: 20 },
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
  ownerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'red',
  },
  adoptButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default PetDetails;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, store } from '../../redux/store';
// import { toggleFavorite } from '../../redux/slices/favoritesSlice';
// import { useRoute } from '@react-navigation/native';
// import { adoptPet } from '../../redux/slices/adoptedPetsSlice';

// import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../navigations/RootStackParamList';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

// type PetDetailsRouteProp = RouteProp<RootStackParamList, 'PetDetails'>;

// const PetDetails = () => {
//   const route = useRoute<PetDetailsRouteProp>();
//   const { petId } = route.params;
//   const dispatch = useDispatch<typeof store.dispatch>();

//   const selectedPet = useSelector((state: RootState) =>
//     state.petDonation.pets.find(pet => pet.id === petId),
//   );

//   const userFavorites = useSelector((state: RootState) => state.user.user?.favorites);

//   const [isFavorite, setIsFavorite] = useState(false);
//   const [ownerProfileImage, setOwnerProfileImage] = useState<string | null>(null);

//   useEffect(() => {
//     if (userFavorites && petId) {
//       setIsFavorite(userFavorites.includes(petId));
//     }
//   }, [userFavorites, petId]);

//   useEffect(() => {
//     if (selectedPet?.id) {
//       fetchOwnerProfile(selectedPet.id);
//     }
//   }, [selectedPet]);

//   const fetchOwnerProfile = async (userId: string) => {
//     try {
//       const userDoc = await firestore().collection('users').doc(userId).get();
//       if (userDoc.exists) {
//         const userData = userDoc.data();
//         setOwnerProfileImage(userData?.photoURL || null);
//       }
//     } catch (error) {
//       console.error('Error fetching owner profile:', error);
//     }
//   };

//   if (!selectedPet) {
//     return (
//       <View style={styles.container}>
//         <Text>No pet selected or loading...</Text>
//       </View>
//     );
//   }

//   const handleAdoptNowPress = async () => {
//     const user = auth().currentUser;

//     if (user && selectedPet) {
//       const userId = user.uid;

//       dispatch(adoptPet(selectedPet.id));

//       try {
//         const petRef = firestore().collection('pets').doc(selectedPet.id);
//         await petRef.update({
//           adoptedBy: firestore.FieldValue.arrayUnion(userId),
//         });
//         console.log(`User ${userId} adopted pet ${selectedPet.name}`);
//       } catch (error) {
//         console.error('Error updating adoption in Firestore:', error);
//       }
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <TouchableOpacity style={styles.favoriteIcon} onPress={() => setIsFavorite(!isFavorite)}>
//         <Ionicons
//           name={isFavorite ? 'heart' : 'heart-outline'}
//           size={30}
//           color={isFavorite ? 'red' : 'black'}
//         />
//       </TouchableOpacity>
//       <View style={styles.petCard}>
//         <Text style={styles.petName}>{selectedPet.name}</Text>
//         <Text style={styles.price}>${selectedPet.amount}</Text>
//         <Text style={styles.type}>{selectedPet.type}</Text>

//         <View style={styles.infoContainer}>
//           <View style={styles.infoBox}>
//             <Text style={styles.infoLabel}>Age</Text>
//             <Text>{selectedPet.age}</Text>
//           </View>
//           <View style={styles.infoBox}>
//             <Text style={styles.infoLabel}>Gender</Text>
//             <Text>{selectedPet.gender}</Text>
//           </View>
//           <View style={styles.infoBox}>
//             <Text style={styles.infoLabel}>Weight</Text>
//             <Text>{selectedPet.weight} kg</Text>
//           </View>
//           <View style={styles.infoBox}>
//             <Text style={styles.infoLabel}>Vaccine</Text>
//             <Text>{selectedPet.Vaccinated ? 'Yes' : 'No'}</Text>
//           </View>
//         </View>

//         <View style={styles.ownerInfo}>
         
//           <View>
//           {ownerProfileImage && (
//             <Image source={{ uri: ownerProfileImage }} style={styles.ownerImage} />
//           )}
//             <Text style={styles.ownerName}>{selectedPet.userName}</Text>
//             <Text style={styles.ownerRole}>Owner</Text>
//           </View>
//         </View>

//         <Text style={styles.description}>{selectedPet.description}</Text>

//         <TouchableOpacity style={styles.adoptButton} onPress={handleAdoptNowPress}>
//           <Text style={styles.adoptButtonText}>Adopt Now</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, backgroundColor: '#f5f5f5' },
//   favoriteIcon: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
//   petCard: {
//     position: 'absolute',
//     backgroundColor: '#fff',
//     height: 450,
//     width: '100%',
//     bottom: 0,
//     borderRadius: 40,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   petName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
//   price: { fontSize: 22, color: '#ff9800', fontWeight: 'bold' },
//   type: { fontSize: 16, color: '#666', marginBottom: 10 },
//   infoContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
//   infoBox: {
//     backgroundColor: '#fdebd0',
//     padding: 10,
//     borderRadius: 10,
//     margin: 5,
//     flex: 1,
//     alignItems: 'center',
//   },
//   infoLabel: { fontSize: 12, color: '#666', marginBottom: 3 },
//   ownerInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   ownerImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//     backgroundColor: 'red',
//   },
//   ownerName: { fontSize: 16, fontWeight: 'bold' },
//   ownerRole: { fontSize: 14, color: '#888', marginLeft: 5 },
//   description: { fontSize: 14, color: '#555', marginBottom: 20 },
//   adoptButton: {
//     backgroundColor: '#111',
//     padding: 15,
//     borderRadius: 30,
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 40,
//     width: 250,
//     alignSelf: 'center',
//   },
//   adoptButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
// });

// export default PetDetails;
