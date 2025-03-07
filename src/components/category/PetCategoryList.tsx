import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import IMAGES from '../../constants/images';



const petCategories = [
  { name: 'Cats', image: IMAGES.cat },
  { name: 'Dogs', image: IMAGES.dog },
  { name: 'Bunnies', image: IMAGES.bunny },
  { name: 'Birds', image: IMAGES.bird },
  { name: 'Turtles', image: IMAGES.turtles },
];

const PetCategoryList = () => {
  return (
    <FlatList
      data={petCategories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PetCategoryList;
