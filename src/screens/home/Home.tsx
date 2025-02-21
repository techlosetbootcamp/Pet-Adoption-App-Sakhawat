
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
  ScrollView,
  Image,
} from 'react-native';
import Search from '../../components/search/Searchbar';
import Header from '../../components/header/Header';
import {useHome} from '../../hooks/useHome';
import {Pet} from '../../types/pets';
import images from '../../constants/images';
import {useAppSelector} from '../../hooks/useSelector';
import PetCard from '../../components/cards/Petcard';

const Home = () => {
  const {
    filters,
    filteredPets,
    status,
    error,
    selectedFilter,
    handleSearch,
    handleFilterSelect,
    handleNavigateToDetails,
  } = useHome();

  const renderPet = ({item}: {item: Pet}) => (
    <TouchableOpacity onPress={() => handleNavigateToDetails(item)}>
      <PetCard>
        <View style={styles.petDetails}>
          <Text style={styles.petName}>{item.name}</Text>
          <Text style={styles.petType}>{item.type}</Text>
          <Text style={styles.petInfo}>Age: {item.age} months</Text>
          <Text style={styles.petprice}> ${item.amount}</Text>
        </View>
        </PetCard>
    </TouchableOpacity>
  );

  const user = useAppSelector(store => store.auth.user);
  console.log(user);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header />
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.newText1}>Find an</Text>
          <Text style={styles.newText3}> Awesome</Text>
          <Text style={styles.newText2}>Pets for You</Text>
        </View>
        <View style={styles.search}>
          <Search onSearch={handleSearch} />
        </View>
        {/* Circular Image Section */}
        <View style={styles.imageContainer}>
          <Image source={images.dog} style={styles.circularImage} />
          <Image source={images.cat} style={styles.circularImage} />
          <Image source={images.bunny} style={styles.circularImage} />
          <Image source={images.bird} style={styles.circularImage} />
          <Image source={images.turtles} style={styles.circularImage} />
        </View>
        {/* Filter Section */}
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          contentContainerStyle={styles.filterContainer}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === item && styles.selectedFilter,
              ]}
              onPress={() => handleFilterSelect(item)}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === item && styles.selectedFilterText,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Search Bar */}

        {/* Pet List */}
        <View style={styles.forYouSection}>
          <Text style={styles.sectionTitle}>For You</Text>
          {status === 'loading' ? (
            <ActivityIndicator size="large" color="#101C1D" />
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            <ScrollView style={styles.petListContainer}>
              <FlatList
                data={filteredPets}
                keyExtractor={item => item.id}
                renderItem={renderPet}
                scrollEnabled={false} // Disable FlatList's scrolling
              />
            </ScrollView>
          )}
        </View>
      </ScrollView>
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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
    gap: 14,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 5,
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
  petListContainer: {
    maxHeight: 400, // Adjust this value based on how much space you want for pets list
  },
  forYouSection: {
    marginTop: 30,
    marginBottom: 20, // Added margin to avoid clipping at the bottom
  },
  imageContainer: {
    flexDirection: 'row',
    gap: 9,
    top: 20,
  },
  search: {
    top: 100,
  },
  circularImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
  },

  sectionTitle: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    fontWeight: '700',
    color: '#101C1D',
  },
  
  petDetails: {
    flex: 1,
  },
  petprice: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 5,
    left: 15,
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
