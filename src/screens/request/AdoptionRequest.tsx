import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {useFetchAdoptionRequests} from '../../hooks/useAdoptionRequests';
import Buttons from '../../components/button/Buttons';
import PetCard from '../../components/card/Petcard';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AdoptionRequest() {
  const {requests, loading, error} = useFetchAdoptionRequests();

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
    const mailto = `mailto:${userEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch(() => {
    });
  };

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Adoption Requests</Text>
    <FlatList
      data={requests}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <PetCard>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Image source={{ uri: item.adopterImage }} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{item.adopterName}</Text>
                <Text style={styles.petInfo}>
                  {item.petName} • {item.petType}
                 
                </Text>
                
                <Text style={styles.email}>{item.adopterEmail}</Text>
               
                <Text style={styles.date}>
                  {item.adoptionDate.split("T")[0]}
                </Text>
              </View>
              
            </View>
            <View >
            <Buttons
              title="Contact"
              onPress={() => handleEmailPress(item.adopterEmail)}
              textStyle={styles.contactText}
              buttonStyle={styles.contactButton}
            />
          </View>
          </View>         
        </PetCard>
      )}
    />
  </View>
  
  );
}  
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 16 },

  row: { flexDirection: "row", alignItems: "flex-start" },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: "#ccc",
    borderRadius: 25,
    marginRight: 10,
    left: 7,
    top: 15,
  },
  name: { fontSize: 16, fontWeight: "bold", left:15, },
  petInfo: { fontSize: 16, fontWeight: "bold", top:5,left:15,},
  email: { fontSize: 12, color: "#888",  top:5,left:15,},
  date: { fontSize: 12, color: "#999",  top:5,left:15, },

  cardContent: {
    flex: 1, 
  },
  
  

  contactButton: {
    height: 35,
    width: "90%",
    borderRadius: 15,
    marginBottom: 10,
    left: 10,
  },

  contactText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});