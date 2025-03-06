import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/rootStackParamList';
import useMyDonation from '../../hooks/useMyDonations'; 
import firestore from '@react-native-firebase/firestore';
import Card from '../../components/card/Card';

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
    }
  };

  const handlePetPress = (id: string) => {
    navigation.navigate('MyPetDetails', { petId: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Donations</Text>
      <Ionicons 
      name="add" 
      size={30} 
      style={styles.headerIcon} 
      onPress={() => navigation.navigate("Donate")} 
    />      
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
          onPress={() => navigation.navigate('MyPetDetails', {petId: item.id})} 
          >            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder} />
            )}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>Age {item.age} Months</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.details}>{item.location}   <Ionicons name="location-outline" size={14} color="red" /></Text>
              </View>
              <Text style={styles.details}>{item.gender}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeletePet(item.id)}>
              <Ionicons name="trash" size={20} color="black" style={styles.trashIcon} />
            </TouchableOpacity>
          </Card>
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
 
  image: {
    width: 170,
    height: 170,
    borderRadius: 10,
    left:-10,
    bottom:40,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    gap: 5,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 10,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
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
  trashIcon:{top:73,
    right: 10,

  }
});
