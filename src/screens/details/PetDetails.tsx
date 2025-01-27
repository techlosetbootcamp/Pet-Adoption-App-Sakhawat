import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Adjust the import according to your folder structure
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootStackParamList'; // Import your stack param list

type PetDetailsRouteProp = RouteProp<RootStackParamList, 'PetDetails'>;

const PetDetails = () => {
  const route = useRoute<PetDetailsRouteProp>();
  const { petId } = route.params;

  // Get selected pet from Redux store
  const selectedPet = useSelector((state: RootState) =>
    state.petDonation.pets.find((pet) => pet.id === petId)
  );

  if (!selectedPet) {
    return (
      <View style={styles.container}>
        <Text>No pet selected or loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.name}>{selectedPet.name}</Text>
      <Text>{selectedPet.type}</Text>
      <Text>Age: {selectedPet.age} months</Text>
      <Text>Gender: {selectedPet.gender}</Text>
      <Text>Description: {selectedPet.description}</Text>
      <Text>Weight: {selectedPet.weight} kg</Text>
      <Text>Vaccinated: {selectedPet.Vaccinated ? 'Yes' : 'No'}</Text>
      <Text>Price: ${selectedPet.amount}</Text>
      
      {/* Display user information */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userNameText}>Posted by: {selectedPet.userName}</Text> {/* Display userName */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5' },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  userInfoContainer: { marginTop: 20 },
  userNameText: { fontSize: 16, fontWeight: '500', color: '#555' },
});

export default PetDetails;
