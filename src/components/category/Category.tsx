import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface CategoryProps {
  categories: { image: any }[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  return (
    <View style={styles.imageContainer}>
      {categories.map((category, index) => (
        <Image key={index} source={category.image} style={styles.circularImage} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    marginHorizontal: 4.5,
    top: 20,
  },
  circularImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 5,
  },
});

export default Category;
