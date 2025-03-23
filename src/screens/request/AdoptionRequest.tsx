import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {useFetchAdoptionRequests} from '../../hooks/useAdoptionRequests';
import Buttons from '../../components/button/Button';
import PetCard from '../../components/petcard/PetCard';
import {COLORS} from '../../constants/colors';
import {adoptionRequestStyles} from '../../styles/adoptionRequest';

export default function AdoptionRequest() {
  const {requests, loading, error} = useFetchAdoptionRequests();

  if (loading) {
    return (
      <View style={adoptionRequestStyles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.black} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={adoptionRequestStyles.errorContainer}>
        <Text style={adoptionRequestStyles.errorText}>{error}</Text>
      </View>
    );
  }

  const handleEmailPress = (userEmail: string) => {
    const subject = 'Hello!';
    const body = 'I would like to talk to you.';
    const mailto = `mailto:${userEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch(() => {});
  };

  return (
    <View style={adoptionRequestStyles.container}>
      <Text style={adoptionRequestStyles.header}>Adoption Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={index => index.toString()}
        renderItem={({item}) => (
          <PetCard>
            <View style={adoptionRequestStyles.cardContent}>
              <View style={adoptionRequestStyles.row}>
                <Image
                  source={{uri: item?.adopterImage}}
                  style={adoptionRequestStyles.avatar}
                />
                <View>
                  <Text style={adoptionRequestStyles.name}>
                    {item?.adopterName}
                  </Text>
                  <Text style={adoptionRequestStyles.petInfo}>
                    {item?.petName} • {item?.petType}
                  </Text>

                  <Text style={adoptionRequestStyles.email}>
                    {item?.adopterEmail}
                  </Text>

                  <Text style={adoptionRequestStyles.date}>
                    {item?.adoptionDate.split('T')[0]}
                  </Text>
                </View>
              </View>
              <View>
                <Buttons
                  title="Contact"
                  onPress={() => handleEmailPress(item?.adopterEmail)}
                  textStyle={adoptionRequestStyles.contactText}
                  buttonStyle={adoptionRequestStyles.contactButton}
                />
              </View>
            </View>
          </PetCard>
        )}
      />
    </View>
  );
}
