import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import Search from '../../components/search/Searchbar';
import { fetchPets, setSelectedPet } from '../../redux/slices/petDonationSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/RootStackParamList';
import { useSearch } from '../../hooks/useSearch';

const filters = ['All', 'Dog', 'Cat', 'Bunny', 'Bird', 'Turtle'];

const { width, height } = Dimensions.get('window');

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  amount: number;
  location: string;
  image: string;
  type: string;
  gender?: string;
  description?: string;
  weight?: number;
  vaccinated?: boolean;
  userName?: string;
}

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const dispatch = useAppDispatch();
  const { pets, status, error } = useAppSelector((state) => state.petDonation);
  
  const { results, searchPets } = useSearch();
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const handleSearch = (searchText: string) => {
    setQuery(searchText);
    searchPets(searchText, selectedFilter.toLowerCase()); 
  };

  
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    // Pass both the query and the selected filter to the searchPets function
    searchPets(query, filter.toLowerCase()); 
  };
  
  const filteredPets = query || selectedFilter !== 'All' ? results : pets; 


  const handleNavigateToDetails = (pet: Pet) => {
    dispatch(setSelectedPet(pet));
    navigation.navigate("PetDetails", { petId: pet.id });
  };

  const renderPet = ({ item }: { item: Pet }) => (
    <TouchableOpacity onPress={() => handleNavigateToDetails(item)}>
      <View style={styles.petCard}>
        <View style={styles.petDetails}>
          <Text style={styles.petName}>{item.name}</Text>
          <Text style={styles.petType}>{item.type}</Text>
          <Text style={styles.petInfo}>Age: {item.age} months</Text>
          <Text style={styles.petInfo}>Price: ${item.amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.newText1}>Find an</Text>
          <Text style={styles.newText3}> Awesome</Text>
          <Text style={styles.newText2}>Pets for You</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search onSearch={handleSearch} />
        </View>

        {/* Filter Section */}
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.filterButton, selectedFilter === item && styles.selectedFilter]}
              onPress={() => handleFilterSelect(item)}
            >
              <Text style={[styles.filterText, selectedFilter === item && styles.selectedFilterText]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Pet List */}
        <View style={styles.forYouSection}>
          <Text style={styles.sectionTitle}>For You</Text>
          {status === 'loading' ? (
            <ActivityIndicator size="large" color="#101C1D" />
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            <FlatList
              data={filteredPets}
              keyExtractor={(item) => item.id}
              renderItem={renderPet}
              scrollEnabled={false} 
            />
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
    paddingHorizontal: width * 0.05,
  },
  title: {
    alignSelf: 'flex-start',
    paddingTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  newText1: {
    fontFamily: 'Montserrat',
    fontSize: width * 0.09,
    fontWeight: '800',
    lineHeight: width * 0.1,
    color: '#101C1D',
  },
  newText3: {
    fontFamily: 'Montserrat',
    fontSize: width * 0.09,
    fontWeight: '800',
    left: -7,
    top: -5,
    color: '#101C1D',
  },
  newText2: {
    fontFamily: 'Montserrat',
    fontSize: width * 0.09,
    fontWeight: '800',
    lineHeight: width * 0.1,
    color: '#101C1D',
  },
  searchContainer: {
    width: '100%',
    justifyContent: 'center',
    top: 120,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
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
    marginTop: height * 0.02,
  },
  sectionTitle: {
    fontFamily: 'Montserrat',
    fontSize: width * 0.06,
    fontWeight: '700',
    marginBottom: height * 0.01,
    color: '#101C1D',
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: height * 0.02,
    padding: width * 0.04,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  petDetails: {
    flex: 1,
  },
  petName: {
    fontFamily: 'Montserrat',
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#101C1D',
    marginBottom: 5,
  },
  petInfo: {
    fontFamily: 'Montserrat',
    fontSize: width * 0.04,
    color: '#555',
    marginBottom: 3,
  },
  petType: {
    fontFamily: 'Montserrat',
    fontSize: width * 0.05,
    color: '#101C1D',
    fontWeight: '600',
  },
});

export default Home;

