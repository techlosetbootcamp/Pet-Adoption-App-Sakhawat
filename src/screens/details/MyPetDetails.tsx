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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#FFFFFF" style={styles.backIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteIcon} onPress={handleDeletePet}>
        <Ionicons name="trash-outline" size={30} color="white" />
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
          {owner?.photoURL && (
            <Image source={{ uri: owner.photoURL }} style={styles.ownerImage} />
          )}
          <Text style={styles.ownerName}>{owner?.username || 'Unknown User'}</Text>
        </View>
          <Text style={styles.ownerRole}>Owner</Text>

        <Text style={styles.description}>{selectedPet.description}</Text>
<Text style={styles.location}>{selectedPet.location}<Ionicons name="location-outline" size={14} color="red" /></Text>
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
    fontWeight: 'bold',
  },
  infoLabel: { fontSize: 12, fontWeight: 'bold', marginBottom: 3, color: '#ff9800', },
  ownerInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  ownerName: { fontSize: 16,top:-10, fontWeight: 'bold' },
  ownerRole: { fontSize: 14, color: '#888', left:55,top:-30, },
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
    deleteIcon: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
  backIcon:{
    top:20,
    left:20,
  }
});

export default PetDetails;

