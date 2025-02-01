import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootStackParamList';

type PetDetailsRouteProp = RouteProp<RootStackParamList, 'MyPetDetails'>;

const MyPetDetails = () => {
  const route = useRoute<PetDetailsRouteProp>();
  const { petId } = route.params;

  // Get the selected pet from Redux store
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

  const handleAdoptNowPress = () => {
    // Handle the adoption logic here
    // For now, we can simply log the action or navigate to another screen
    console.log(`Adopt Now pressed for ${selectedPet.name}`);
    // For example, navigate to an adoption confirmation screen
    // navigation.navigate('AdoptionConfirmation', { petId: selectedPet.id });
  };

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
      <Text>Location: {selectedPet.location}</Text>

      {/* Display user information */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userNameText}>Posted by: {selectedPet.userName}</Text>
      </View>

      {/* Adopt Now Button */}
      <Button title="Adopt Now" onPress={handleAdoptNowPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  userInfoContainer: { marginTop: 20 },
  userNameText: { fontSize: 16, fontWeight: '500', color: '#555' },
});

export default MyPetDetails;
