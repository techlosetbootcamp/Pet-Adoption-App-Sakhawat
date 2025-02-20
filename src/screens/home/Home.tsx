// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   KeyboardAvoidingView,
//   StyleSheet,
//   Platform,
//   Dimensions,
//   FlatList,
//   ActivityIndicator,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
// import Search from '../../components/search/Searchbar';
// import { fetchPets, setSelectedPet } from '../../redux/slices/petDonationSlice';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../navigations/RootStackParamList';
// import { useSearch } from '../../hooks/useSearch';
// import Header from '../../components/header/Header';

// const filters = ['All', 'Dog', 'Cat', 'Bunny', 'Bird', 'Turtle'];

// const { width, height } = Dimensions.get('window');

// interface Pet {
//   id: string;
//   name: string;
//   breed: string;
//   age: number;
//   amount: number;
//   location: string;
//   image: string;
//   type: string;
//   gender?: string;
//   description?: string;
//   weight?: number;
//   vaccinated?: boolean;
//   userName?: string;
// }

// const Home = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
//   const dispatch = useAppDispatch();
//   const { pets, status, error } = useAppSelector((state) => state.petDonation);

//   const { results, searchPets } = useSearch();
//   const [query, setQuery] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('All');

//   useEffect(() => {
//     dispatch(fetchPets());
//   }, [dispatch]);

//   const handleSearch = (searchText: string) => {
//     setQuery(searchText);
//     searchPets(searchText, selectedFilter); // Filter by selected category
//   };

//   const handleFilterSelect = (filter: string) => {
//     setSelectedFilter(filter);
//     // Pass both the query and the selected filter to the searchPets function
//     searchPets(query, filter.toLowerCase());
//   };

//   const filteredPets = query || selectedFilter !== 'All' ? results : pets;

//   const handleNavigateToDetails = (pet: Pet) => {
//     dispatch(setSelectedPet(pet));
//     navigation.navigate("PetDetails", { petId: pet.id });
//   };

//   const renderPet = ({ item }: { item: Pet }) => (
//     <TouchableOpacity onPress={() => handleNavigateToDetails(item)}>
//       <View style={styles.petCard}>
//         <View style={styles.petDetails}>
//           <Text style={styles.petName}>{item.name}</Text>
//           <Text style={styles.petType}>{item.type}</Text>
//           <Text style={styles.petInfo}>Age: {item.age} months</Text>
//           <Text style={styles.petInfo}>Price: ${item.amount}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (

//     <KeyboardAvoidingView
//     style={styles.container}
//     behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <Header />
//       <ScrollView>
//         <View style={styles.title}>
//           <Text style={styles.newText1}>Find an</Text>
//           <Text style={styles.newText3}> Awesome</Text>
//           <Text style={styles.newText2}>Pets for You</Text>
//         </View>

//         {/* Search Bar */}
//         <View style={styles.searchContainer}>
//           <Search onSearch={handleSearch} />
//         </View>

//         {/* Filter Section */}
//         <FlatList
//           data={filters}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={(item) => item}
//           contentContainerStyle={styles.filterContainer}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={[styles.filterButton, selectedFilter === item && styles.selectedFilter]}
//               onPress={() => handleFilterSelect(item)}
//             >
//               <Text style={[styles.filterText, selectedFilter === item && styles.selectedFilterText]}>
//                 {item}
//               </Text>
//             </TouchableOpacity>
//           )}
//         />

//         {/* Pet List */}
//         <View style={styles.forYouSection}>
//           <Text style={styles.sectionTitle}>For You</Text>
//           {status === 'loading' ? (
//             <ActivityIndicator size="large" color="#101C1D" />
//           ) : error ? (
//             <Text>Error: {error}</Text>
//           ) : (
//             <FlatList
//               data={filteredPets}
//               keyExtractor={(item) => item.id}
//               renderItem={renderPet}
//               scrollEnabled={false}
//             />
//           )}
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: width * 0.05,
//   },
//   title: {
//     alignSelf: 'flex-start',
//     paddingTop: height * 0.02,
//     marginBottom: height * 0.02,
//   },
//   newText1: {
//     fontFamily: 'Montserrat',
//     fontSize: width * 0.09,
//     fontWeight: '800',
//     lineHeight: width * 0.1,
//     color: '#101C1D',
//   },
//   newText3: {
//     fontFamily: 'Montserrat',
//     fontSize: width * 0.09,
//     fontWeight: '800',
//     left: -7,
//     top: -5,
//     color: '#101C1D',
//   },
//   newText2: {
//     fontFamily: 'Montserrat',
//     fontSize: width * 0.09,
//     fontWeight: '800',
//     lineHeight: width * 0.1,
//     color: '#101C1D',
//   },
//   searchContainer: {
//     width: '100%',
//     justifyContent: 'center',
//     top: 120,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   filterButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   selectedFilter: {
//     backgroundColor: '#101C1D',
//   },
//   filterText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#101C1D',
//   },
//   selectedFilterText: {
//     color: '#fff',
//   },
//   forYouSection: {
//     marginTop: height * 0.02,
//   },
//   sectionTitle: {
//     fontFamily: 'Montserrat',
//     fontSize: width * 0.06,
//     fontWeight: '700',
//     marginBottom: height * 0.01,
//     color: '#101C1D',
//   },
//   petCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//     marginBottom: height * 0.02,
//     padding: width * 0.04,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   petDetails: {
//     flex: 1,
//   },
//   petName: {
//     fontFamily: 'Montserrat',
//     fontSize: width * 0.05,
//     fontWeight: '700',
//     color: '#101C1D',
//     marginBottom: 5,
//   },
//   petInfo: {
//     fontFamily: 'Montserrat',
//     fontSize: width * 0.04,
//     color: '#555',
//     marginBottom: 3,
//   },
//   petType: {
//     fontFamily: 'Montserrat',
//     fontSize: width * 0.05,
//     color: '#101C1D',
//     fontWeight: '600',
//   },
// });

// export default Home;

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
      <View style={styles.petCard}>
        <View style={styles.petDetails}>
          <Text style={styles.petName}>{item.name}</Text>
          <Text style={styles.petType}>{item.type}</Text>
          <Text style={styles.petInfo}>Age: {item.age} months</Text>
          <Text style={styles.petprice}> ${item.amount}</Text>
        </View>
      </View>
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
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
    height: 150,
    marginTop: 40,
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
