import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/rootStackParamList';
import useMyDonation from '../../hooks/useMyDonations';
import firestore from '@react-native-firebase/firestore';
import Card from '../../components/card/Card';
import {COLORS} from '../../constants/colors';
import {FIREBASE_COLLECTIONS} from '../../constants/firebase';
import {myDonationStyles} from '../../styles/myDonation';

interface RootState {
  auth: {
    user: {
      uid: string;
    } | null;
  };
}

type MyDonationsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyDonations'
>;

export default function MyDonations() {
  const navigation = useNavigation<MyDonationsNavigationProp>();
  const {pets, loading} = useMyDonation();

  const handleDeletePet = async (id: string) => {
    try {
      await firestore().collection(FIREBASE_COLLECTIONS.pets).doc(id).delete();
    } catch (error) {}
  };

  return (
    <View style={myDonationStyles.container}>
      <Text style={myDonationStyles.title}>My Donations</Text>
      <Ionicons
        name="add"
        size={30}
        style={myDonationStyles.headerIcon}
        onPress={() => navigation.navigate('Donate')}
      />
      <FlatList
        data={pets}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card
            onPress={() =>
              navigation.navigate('MyPetDetails', {petId: item?.id})
            }>
            {' '}
            {item.image ? (
              <Image
                source={{uri: item?.image}}
                style={myDonationStyles.image}
              />
            ) : (
              <View style={myDonationStyles.imagePlaceholder} />
            )}
            <View style={myDonationStyles.infoContainer}>
              <Text style={myDonationStyles.name}>{item?.name}</Text>
              <Text style={myDonationStyles.details}>
                Age {item?.age} Months
              </Text>
              <View style={myDonationStyles.locationContainer}>
                <Text style={myDonationStyles.details}>
                  {item?.location}
                  <Ionicons name="location-outline" size={14} color="red" />
                </Text>
              </View>
              <Text style={myDonationStyles.details}>{item?.gender}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeletePet(item.id)}>
              <Ionicons
                name="trash"
                size={20}
                color={COLORS.black}
                style={myDonationStyles.trashIcon}
              />
            </TouchableOpacity>
          </Card>
        )}
        ListEmptyComponent={
          !loading ? (
            <Text style={myDonationStyles.noDonations}>No pets found.</Text>
          ) : null
        }
      />
    </View>
  );
}
