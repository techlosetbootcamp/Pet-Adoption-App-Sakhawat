import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {PETCATEGORIES} from '../../constants/petcategories';
import {petCategoryStyles} from '../../styles/petCategoryList';

const PetCategoryList = () => {
  return (
    <FlatList
      data={PETCATEGORIES}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item?.name}
      contentContainerStyle={petCategoryStyles.container}
      renderItem={({item}) => (
        <View style={petCategoryStyles.itemContainer}>
          <Image source={item?.image} style={petCategoryStyles.image} />
          <Text style={petCategoryStyles.text}>{item?.name}</Text>
        </View>
      )}
    />
  );
};

export default PetCategoryList;
