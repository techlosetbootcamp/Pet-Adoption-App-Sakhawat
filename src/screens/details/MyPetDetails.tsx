import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/rootStackParamList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import useUserDetails from '../../hooks/usePetDetails';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import PetInfoBox from '../../components/box/PetInfoBox';
import BackButton from '../../components/back/BackButton';

type PetDetailsRouteProp = RouteProp<RootStackParamList, 'PetDetails'>;

const PetDetails = () => {
  const route = useRoute<PetDetailsRouteProp>();
  const navigation = useNavigation();
  const { petId } = route.params;
  const dispatch = useAppDispatch();

  const selectedPet = useAppSelector((state) =>
    state.adoptedPet.pets.find(pet => pet.id === petId),
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
              navigation.goBack(); 
            },
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to delete pet.');
    }
  };

  const petDetails = [
    { label: 'Age', value: `${selectedPet.age} months` },
    { label: 'Gender', value: selectedPet.gender },
    { label: 'Weight', value: `${selectedPet.weight} kg` },
    { label: 'Vaccine', value: selectedPet.vaccinated ? 'Yes' : 'No' },
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton  />
      
      <TouchableOpacity style={styles.deleteIcon} onPress={handleDeletePet}>
        <Ionicons name="trash-outline" size={30} color="white" />
      </TouchableOpacity>
      
      <View style={styles.petCard}>
        <Text style={styles.petName}>{selectedPet.name}</Text>
        <Text style={styles.price}>${selectedPet.amount}</Text>
        <Text style={styles.type}>{selectedPet.type}</Text>

        <View style={styles.infoContainer}>
        {petDetails.map((detail, index) => (
          detail.value && <PetInfoBox key={index} label={detail.label} value={detail.value} />
      ))}
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40, 
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
    alignSelf: 'flex-end',
    textAlign: 'right',  
    marginLeft: 'auto', 
  },
    type: { fontSize: 15, color: '#666', top:-15 },
  infoContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  
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
    alignSelf: 'flex-end',
    textAlign: 'right', 
    right: 20, 
    position: 'absolute',
    fontSize:15, 
  },
    deleteIcon: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
  
});

export default PetDetails;

