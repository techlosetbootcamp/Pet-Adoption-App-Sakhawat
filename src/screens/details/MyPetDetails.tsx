// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { useAppSelector } from '../../hooks/useSelector';
// import firestore from '@react-native-firebase/firestore';
// import { useAppDispatch } from '../../hooks/useSelector';
// import { RootState } from '../../redux/store';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../navigations/RootStackParamList';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// type PetDetailsRouteProp = RouteProp<RootStackParamList, 'MyPetDetails'>;

// const MyPetDetails = () => {
//   const route = useRoute<PetDetailsRouteProp>();
//   const { petId } = route.params;
//   const dispatch = useAppDispatch();
//   const navigation = useNavigation();

//   const selectedPet = useAppSelector((state: RootState) =>
//     state.petDonation.pets.find((pet) => pet.id === petId)
//   );

//   if (!selectedPet) {
//     return (
//       <View style={styles.container}>
//         <Text>No pet selected or loading...</Text>
//       </View>
//     );
//   }

//   const handleAdoptNowPress = () => {
//     console.log(`Adopt Now pressed for ${selectedPet.name}`);
//   };

//   const handleDeletePet = async (id: string) => {
//     try {
//       await firestore().collection('pets').doc(id).delete();
//       // After deletion, navigate back to the previous screen
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error deleting pet:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <TouchableOpacity
//         style={styles.deleteIcon}
//         onPress={() => handleDeletePet(selectedPet.id)}
//       >
//         <Ionicons name="trash-outline-" size={30} color="black" />
//       </TouchableOpacity>
//       <View style={styles.petCard}>
//         <Text style={styles.petName}>{selectedPet.name}</Text>
//         <Text style={styles.price}>${selectedPet.amount}</Text>
//         <Text style={styles.type}>{selectedPet.type}</Text>

//         <View style={styles.infoContainer}>
//           <View style={styles.infoBox}>
//             <Text style={styles.infoLabel}>Age</Text>
//             <Text>{selectedPet.age} months</Text>
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
//           <Text style={styles.ownerName}>{selectedPet.userName}</Text>
//           <Text style={styles.ownerRole}>Owner</Text>
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
//   deleteIcon: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
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

// export default MyPetDetails;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootStackParamList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import useUserDetails from '../../hooks/usePetDetails';

type PetDetailsRouteProp = RouteProp<RootStackParamList, 'PetDetails'>;

const PetDetails = () => {
  const route = useRoute<PetDetailsRouteProp>();
  const navigation = useNavigation();
  const { petId } = route.params;
  const dispatch = useDispatch<typeof store.dispatch>();

  const selectedPet = useSelector((state: RootState) =>
    state.petDonation.pets.find(pet => pet.id === petId),
  );

  const { user: owner, loading: ownerLoading, error: ownerError } = useUserDetails(selectedPet?.id || '');

  if (!selectedPet) {
    return (
      <View style={styles.container}>
        <Text>No pet selected or loading...</Text>
      </View>
    );
  }

  const handleDeletePet = async () => {
    try {
      Alert.alert(
        'Delete Pet',
        'Are you sure you want to delete this pet?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await firestore().collection('pets').doc(selectedPet.id).delete();
              Alert.alert('Success', 'Pet deleted successfully.');
              navigation.goBack(); // Navigate back after deletion
            },
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error('Error deleting pet:', error);
      Alert.alert('Error', 'Failed to delete pet.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.deleteIcon} onPress={handleDeletePet}>
        <Ionicons name="trash-outline" size={30} color="red" />
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f5f5f5' },
  deleteIcon: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
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
  ownerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default PetDetails;


// import React from 'react';
// import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { AppStackParamList } from '../../types/navigation';
// import useHeader from '../../hooks/useHeader';
// import IMAGES from '../../assets/images/index';

// // Define navigation type
// type NavigationProps = NativeStackNavigationProp<AppStackParamList, 'PasswordUpdate'>;

// const Header = () => {
//   const { toggleDrawer, profileImage } = useHeader();
//   const navigation = useNavigation<NavigationProps>();

//   return (
//     <View style={styles.header}>
//       <TouchableOpacity onPress={toggleDrawer}>
//         <Image source={IMAGES.MODELTABL} alt="modeltab" />
//       </TouchableOpacity>

//       {/* Navigate to PasswordUpdate screen when clicking on the profile image */}
//       <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
//         <Image source={profileImage} style={styles.profile} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     height: 70,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//   },
//   profile: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
// });

// export default Header;