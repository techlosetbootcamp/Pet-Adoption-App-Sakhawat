import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/rootStackParamList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import useUserDetails from '../../hooks/usePetDetails';
import {useAppSelector} from '../../redux/store';
import PetInfoBox from '../../components/petinfobox/PetInfoBox';
import BackButton from '../../components/backbutton/BackButton';
import {COLORS} from '../../constants/colors';
import {FIREBASE_COLLECTIONS} from '../../constants/firebase';
import {GET_PET_DETAILS_LIST} from '../../constants/petdetailslist';
import {myPetDetailsStyles} from '../../styles/myPetDetails';

type PetDetailsRouteProp = RouteProp<RootStackParamList, 'PetDetails'>;

const PetDetails = () => {
  const route = useRoute<PetDetailsRouteProp>();
  const navigation = useNavigation();
  const {petId} = route.params;

  const selectedPet = useAppSelector(state =>
    state.adoptedPet.pets.find(pet => pet.id === petId),
  );

  const {user: owner} = useUserDetails(selectedPet?.id || '');

  if (!selectedPet) {
    return (
      <View style={myPetDetailsStyles.container}>
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
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            onPress: async () => {
              await firestore()
                .collection(FIREBASE_COLLECTIONS.pets)
                .doc(selectedPet.id)
                .delete();
              Alert.alert('Success', 'Pet deleted successfully.');
              navigation.goBack();
            },
            style: 'destructive',
          },
        ],
        {cancelable: true},
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to delete pet.');
    }
  };

  return (
    <ScrollView contentContainerStyle={myPetDetailsStyles.container}>
      <BackButton />

      <TouchableOpacity
        style={myPetDetailsStyles.deleteIcon}
        onPress={handleDeletePet}>
        <Ionicons name="trash-outline" size={30} color={COLORS.white} />
      </TouchableOpacity>

      <View style={myPetDetailsStyles.petCard}>
        <Text style={myPetDetailsStyles.petName}>{selectedPet?.name}</Text>
        <Text style={myPetDetailsStyles.price}>${selectedPet?.amount}</Text>
        <Text style={myPetDetailsStyles.type}>{selectedPet?.type}</Text>

        <View style={myPetDetailsStyles.infoContainer}>
          {GET_PET_DETAILS_LIST({
            ...selectedPet,
            gender: selectedPet.gender || '',
            weight: selectedPet.weight || 0,
            vaccinated: selectedPet.vaccinated ?? false,
          }).map(
            (detail, index) =>
              detail.value && (
                <PetInfoBox
                  key={index}
                  label={detail.label}
                  value={detail.value}
                />
              ),
          )}
        </View>

        <View style={myPetDetailsStyles.ownerInfo}>
          {owner?.photoURL && (
            <Image
              source={{uri: owner.photoURL}}
              style={myPetDetailsStyles.ownerImage}
            />
          )}
          <Text style={myPetDetailsStyles.ownerName}>
            {owner?.username || 'Unknown User'}
          </Text>
        </View>
        <Text style={myPetDetailsStyles.ownerRole}>Owner</Text>

        <Text style={myPetDetailsStyles.description}>
          {selectedPet.description}
        </Text>
        <Text style={myPetDetailsStyles.location}>
          {selectedPet.location}
          <Ionicons name="location-outline" size={14} color="red" />
        </Text>
      </View>
    </ScrollView>
  );
};

export default PetDetails;
