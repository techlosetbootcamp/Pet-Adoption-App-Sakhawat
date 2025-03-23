import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Search from '../../components/searchbar/Searchbar';
import Header from '../../components/header/Header';
import {useHome} from '../../hooks/useHome';
import {Pet} from '../../types/pets';
import PetCard from '../../components/petcard/PetCard';
import PetCategoryList from '../../components/petcategorylist/PetCategoryList';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';
import {homeStyles} from '../../styles/home';

const Home = () => {
  const {filteredPets, status, error, handleSearch, handleNavigateToDetails} =
    useHome();

  const RenderPet = ({item}: {item: Pet}) => (
    <TouchableOpacity onPress={() => handleNavigateToDetails(item)}>
      <PetCard>
        <ImageBackground
          source={{uri: item?.image}}
          style={homeStyles.petImage}>
          <View style={homeStyles.petDetails}>
            <Text style={homeStyles.petName}>{item?.name}</Text>
            <Text style={homeStyles.petType}>{item?.type}</Text>
            <Text style={homeStyles.petInfo}>Age: {item?.age} months</Text>
            <Text style={homeStyles.petprice}> ${item?.amount}</Text>
          </View>
        </ImageBackground>
      </PetCard>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={homeStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        ListHeaderComponent={
          <>
            <Header />
            <View style={homeStyles.title}>
              <Text style={homeStyles.newText1}>Find an</Text>
              <Text style={homeStyles.newText3}> Awesome</Text>
              <Text style={homeStyles.newText2}>Pets for You</Text>
            </View>
            <View style={homeStyles.search}>
              <Search onSearch={handleSearch} />
            </View>
            <PetCategoryList />
          </>
        }
        data={filteredPets}
        keyExtractor={item => item.id}
        renderItem={RenderPet}
        ListEmptyComponent={
          status === 'loading' ? (
            <ActivityIndicator size="large" color={COLORS.black} />
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            <Text>No pets found</Text>
          )
        }
      />
    </KeyboardAvoidingView>
  );
};

export default Home;
