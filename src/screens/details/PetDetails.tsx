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
import {petDetailsStyles} from '../../styles/petDetails';

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
      <View style={petDetailsStyles.container}>
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
    <ScrollView contentContainerStyle={petDetailsStyles.container}>
      <BackButton />

      <TouchableOpacity
        style={petDetailsStyles.favoriteIcon}
        onPress={handleDeletePet}>
        <Ionicons name="favorite-outline" size={30} color={COLORS.white} />
      </TouchableOpacity>

      <View style={petDetailsStyles.petCard}>
        <Text style={petDetailsStyles.petName}>{selectedPet?.name}</Text>
        <Text style={petDetailsStyles.price}>${selectedPet?.amount}</Text>
        <Text style={petDetailsStyles.type}>{selectedPet?.type}</Text>

        <View style={petDetailsStyles.infoContainer}>
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

        <View style={petDetailsStyles.ownerInfo}>
          {owner?.photoURL && (
            <Image
              source={{uri: owner.photoURL}}
              style={petDetailsStyles.ownerImage}
            />
          )}
          <Text style={petDetailsStyles.ownerName}>
            {owner?.username || 'Unknown User'}
          </Text>
        </View>
        <Text style={petDetailsStyles.ownerRole}>Owner</Text>

        <Text style={petDetailsStyles.description}>
          {selectedPet.description}
        </Text>
        <Text style={petDetailsStyles.location}>
          {selectedPet.location}
          <Ionicons name="location-outline" size={14} color="red" />
        </Text>
      </View>
    </ScrollView>
  );
};

export default PetDetails;
