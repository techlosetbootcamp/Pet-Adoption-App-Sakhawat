import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/AppNavigator';
import useMyDonation from '../../hooks/useMyDonations'; // Adjust the path as needed
import firestore from '@react-native-firebase/firestore';

interface RootState {
  auth: {
    user: {
      uid: string;
    } | null;
  };
}

type MyDonationsNavigationProp = StackNavigationProp<RootStackParamList, 'MyDonations'>;

export default function MyDonations() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation<MyDonationsNavigationProp>();
  const { pets, loading } = useMyDonation();

  const handleDeletePet = async (id: string) => {
    try {
      await firestore().collection('pets').doc(id).delete();
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const handlePetPress = (id: string) => {
    navigation.navigate('MyPetDetails', { petId: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Donations</Text>
              <Ionicons name="add" size={30} style={styles.headerIcon} />
      
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePetPress(item.id)} style={styles.card}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder} />
            )}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>Age {item.age} Months</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.details}>{item.location}</Text>
                <Ionicons name="location-outline" size={14} color="red" />
              </View>
              <Text style={styles.details}>{item.gender}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeletePet(item.id)}>
              <Ionicons name="trash" size={25} color="black" style={styles.trashIcon} />
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
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    height:130,
    top:35,
    
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 10,
    left:-10,
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
  headerIcon: {
    position: 'absolute',
    right: 10,
    top:20,
  },
  trashIcon:{top:33,

  }
});
