import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Search from '../../components/searchbar/Searchbar';
import Header from '../../components/header/Header';
import { useHome } from '../../hooks/useHome';
import { Pet } from '../../types/pets';
import PetCard from '../../components/card/PetCard';
import PetCategoryList from '../../components/category/PetCategoryList';

const Home = () => {
  const {
    filteredPets,
    status,
    error,
    handleSearch,
    handleNavigateToDetails,
  } = useHome();

  const RenderPet = ({ item }: { item: Pet }) => (
    <TouchableOpacity onPress={() => handleNavigateToDetails(item)}>
      <PetCard>
        <ImageBackground source={{ uri: item.image }} style={styles.petImage}>
          <View style={styles.petDetails}>
            <Text style={styles.petName}>{item.name}</Text>
            <Text style={styles.petType}>{item.type}</Text>
            <Text style={styles.petInfo}>Age: {item.age} months</Text>
            <Text style={styles.petprice}> ${item.amount}</Text>
          </View>
        </ImageBackground>
      </PetCard>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        ListHeaderComponent={
          <>
            <Header />
            <View style={styles.title}>
              <Text style={styles.newText1}>Find an</Text>
              <Text style={styles.newText3}> Awesome</Text>
              <Text style={styles.newText2}>Pets for You</Text>
            </View>
            <View style={styles.search}>
              <Search onSearch={handleSearch} />
            </View>
            <PetCategoryList />
          </>
        }
        data={filteredPets}
        keyExtractor={(item) => item.id}
        renderItem={RenderPet}
        ListEmptyComponent={
          status === 'loading' ? (
            <ActivityIndicator size="large" color="#101C1D" />
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  newText1: {
    fontFamily: 'Montserrat',
    fontSize: 40,
    fontWeight: '800',
    color: '#101C1D',
  },
  newText3: {
    fontFamily: 'Montserrat',
    fontSize: 40,
    fontWeight: '800',
    left: -7,
    color: '#101C1D',
  },
  newText2: {
    fontFamily: 'Montserrat',
    fontSize: 40,
    fontWeight: '800',
    color: '#101C1D',
  },
  petImage: {
    width: "100%", 
    borderRadius: 30,

  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    left:15,
    marginBottom: 10,
    gap: 40,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  selectedFilter: {
    backgroundColor: '#101C1D',
  },
  filterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#101C1D',
  },
  selectedFilterText: {
    color: '#fff',
  },
  forYouSection: {
    marginTop: 30,
    marginBottom: 20, 
  },

  search: {
    top: 100,
  },
 
  sectionTitle: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    fontWeight: '700',
    color: '#101C1D',
  },
  
  petDetails: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 30,

    flex: 1,
  },
  petprice: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 5,
    left: 15,
    color: 'white',

  },
  petName: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
    left: 15,
  },
  petInfo: {
    fontFamily: 'Montserrat',
    fontSize: 10,
    color: 'white',
    marginBottom: 3,
    left: 15,
  },
  petType: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
    left: 15,
  },
});

export default Home;
