import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';

const donations = [
  { id: '1', name: 'Cavachon', age: '4 Months', location: 'FSD', gender: 'Male' },
  { id: '2', name: 'Bobtail', age: '4 Months', location: 'FSD', gender: 'Male' },
];

export default function MyDonations() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Donations</Text>
      <FlatList
        data={donations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>Age {item.age}</Text>
              <Text style={styles.details}>{item.location} <Ionicons name="location-outline" size={14} color="red" /></Text>
              <Text style={styles.details}>{item.gender}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
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
    backgroundColor: '#f9f9f9',
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
});
