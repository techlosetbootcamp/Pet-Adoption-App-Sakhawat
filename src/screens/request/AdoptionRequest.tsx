import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator, Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAdoptionRequests from '../../hooks/useAdoptionRequests';





export default function AdoptionRequest() {
  const {requests, loading, error} = useAdoptionRequests();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#111" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

    const handleEmailPress = (userEmail: string) => {
      const subject = 'Hello!';
      const body = 'I would like to talk to you.';
      const mailto = `mailto:${userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      Linking.openURL(mailto).catch(err => console.error('Error opening email client', err));
    };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Donation Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Image
                source={{uri: item.adopterImage}}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>{item.adopterName}</Text>
                <Text style={styles.petInfo}>
                  {item.petName} • {item.petType}
                </Text>
                <Text style={styles.email}>{item.adopterEmail}</Text>
                <View style={styles.row}>
                  <Ionicons name="location-outline" size={16} color="red" />
                  <Text style={styles.location}>{item.adopterLocation}</Text>
                </View>
                <Text style={styles.date}>{item.adoptionDate}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.contactButton} onPress={() => handleEmailPress(item.adopterEmail)}>
        <Text style={styles.contactText}>Contact via Email</Text>
      </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
  header: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorText: {color: 'red', fontSize: 16},
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  row: {flexDirection: 'row', alignItems: 'flex-start'},
  avatar: {width: 50, height: 50, backgroundColor:'#ccc', borderRadius: 25, marginRight: 10},
  name: {fontSize: 16, fontWeight: 'bold'},
  petInfo: {fontSize: 14, color: '#666'},
  email: {fontSize: 12, color: '#888', marginTop: 5},
  location: {fontSize: 12, color: '#666', marginLeft: 5},
  date: {fontSize: 12, color: '#999', marginTop: 5},
  contactButton: {
    backgroundColor: '#111',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  contactText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});
