import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/AppNavigator';

interface RootState {
  auth: {
    user: {
      uid: string;
    } | null;
  };
}

interface Pet {
  id: string;
  name: string;
  age: string;
  location: string;
  gender: string;
  image?: string;
  userId: string;
}

type MyDonationsNavigationProp = StackNavigationProp<RootStackParamList, 'MyDonations'>;

export default function MyDonations() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<MyDonationsNavigationProp>();

  useEffect(() => {
    if (!user?.uid) return;

    console.log('Fetching pets in real-time for user:', user.uid);

    const unsubscribe = firestore()
      .collection('pets')
      .where('userId', '==', user.uid)
      .onSnapshot(
        (querySnapshot) => {
          console.log('Fetched from Firestore. Docs count:', querySnapshot.size);

          const petsData: Pet[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Pet[];

          setPets(petsData);
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching Firestore data:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [user?.uid]);

  const handleDeletePet = async (id: string) => {
    try {
      await firestore().collection('pets').doc(id).delete();
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const handlePetPress = (id: string) => {
    console.log('Card pressed with petId:', id);  // Debugging log
    navigation.navigate('PetDetails', { petId: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Donations</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePetPress(item.id)} style={styles.card}>
            {/* Image or Placeholder */}
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder} />
            )}
            {/* Info Container */}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>Age {item.age} Months</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline-black" size={14} color="red" />
                <Text style={styles.details}>{item.location}</Text>
              </View>
              <Text style={styles.details}>{item.gender}</Text>
            </View>
            {/* Info Icon */}
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="blue"
              style={{ marginRight: 10 }}
            />
            {/* Delete Icon */}
            <TouchableOpacity onPress={() => handleDeletePet(item.id)}>
              <Ionicons name="trash-outline-" size={20} color="black" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !loading ? <Text style={styles.noDonations}>No pets found.</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noDonations: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});
