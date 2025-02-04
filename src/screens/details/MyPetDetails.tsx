import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../../hooks/useSelector';
import firestore from '@react-native-firebase/firestore';
import { useAppDispatch } from '../../hooks/useSelector';
import { RootState } from '../../redux/store';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootStackParamList';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PetDetailsRouteProp = RouteProp<RootStackParamList, 'MyPetDetails'>;

const MyPetDetails = () => {
  const route = useRoute<PetDetailsRouteProp>();
  const { petId } = route.params;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const selectedPet = useAppSelector((state: RootState) =>
    state.petDonation.pets.find((pet) => pet.id === petId)
  );

  if (!selectedPet) {
    return (
      <View style={styles.container}>
        <Text>No pet selected or loading...</Text>
      </View>
    );
  }

  const handleAdoptNowPress = () => {
    console.log(`Adopt Now pressed for ${selectedPet.name}`);
  };

  const handleDeletePet = async (id: string) => {
    try {
      await firestore().collection('pets').doc(id).delete();
      // After deletion, navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => handleDeletePet(selectedPet.id)}
      >
        <Ionicons name="trash-outline-" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.petCard}>
        <Text style={styles.petName}>{selectedPet.name}</Text>
        <Text style={styles.price}>${selectedPet.amount}</Text>
        <Text style={styles.type}>{selectedPet.type}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text>{selectedPet.age} months</Text>
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
          <Text style={styles.ownerName}>{selectedPet.userName}</Text>
          <Text style={styles.ownerRole}>Owner</Text>
        </View>

        <Text style={styles.description}>{selectedPet.description}</Text>

        <TouchableOpacity style={styles.adoptButton} onPress={handleAdoptNowPress}>
          <Text style={styles.adoptButtonText}>Adopt Now</Text>
        </TouchableOpacity>
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
  adoptButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default MyPetDetails;
