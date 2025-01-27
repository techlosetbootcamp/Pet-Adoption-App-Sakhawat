
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   KeyboardAvoidingView,
//   StyleSheet,
//   Platform,
//   Dimensions,
//   FlatList,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import Search from '../../components/search/Searchbar';
// import firestore from '@react-native-firebase/firestore';

// const { width, height } = Dimensions.get('window'); // Get screen dimensions

// // Define the type for the pet object
// interface Pet {
//   id: string;
//   name: string;
//   breed: string;
//   age: number; // in months
//   amount: number;
//   location: string;
//   image: string;
//   type: string;
// }

// const Home = () => {
//   const [pets, setPets] = useState<Pet[]>([]); // Set pets state type as Pet[]
//   const [loading, setLoading] = useState(true);

//   const handleSearch = (searchText: string) => {
//     console.log('Search Text:', searchText);
//   };

//   // Fetch pets from Firebase Firestore
//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const snapshot = await firestore().collection('pets').get();
//         const petsData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Pet[]; // Explicitly cast to Pet[] type
//         setPets(petsData);
//       } catch (error) {
//         console.error('Error fetching pets:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPets();
//   }, []);

//   const renderPet = ({ item }: { item: Pet }) => (
//     <View style={styles.petCard}>
//       <View style={styles.petDetails}>
//         <Text style={styles.petName}>{item.name}</Text>
//         <Text style={styles.petType}>{item.type}</Text>
//         <Text style={styles.petInfo}>Age: {item.age} months</Text>
//         <Text style={styles.petInfo}>Price: ${item.amount}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <View style={styles.title}>
//         <Text style={styles.newText1}>Find an</Text>
//         <Text style={styles.newText3}> Awesome</Text>
//         <Text style={styles.newText2}>Pets for You</Text>
//       </View>
//       <View style={styles.searchContainer}>
//         <Search onSearch={handleSearch} />
//       </View>

//       <View style={styles.forYouSection}>
//         <Text style={styles.sectionTitle}>For You</Text>
//         {loading ? (
//           <ActivityIndicator size="large" color="#101C1D" />
//         ) : (
//           <FlatList
//             data={pets}
//             keyExtractor={(item) => item.id}
//             renderItem={renderPet}
//             showsVerticalScrollIndicator={false}
//           />
//         )}
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: width * 0.05, // 5% horizontal padding
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
//     top: 140,
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

import React, { useEffect } from 'react';
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
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector'; // Typed hooks
import Search from '../../components/search/Searchbar';
import { fetchPets, setSelectedPet } from '../../redux/slices/petDonationSlice'; // Updated actions to fetch pets and set selected pet
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import the correct type
import { RootStackParamList } from '../../navigations/RootStackParamList'; // Import your stack param list

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
  Vaccinated?: boolean;
  userName?: string;
}

const Home = () => {
  // Correctly type the navigation prop
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const dispatch = useAppDispatch();
  const { pets, status, error } = useAppSelector((state) => state.petDonation);

  const handleNavigateToDetails = (pet: Pet) => {
    dispatch(setSelectedPet(pet)); // Save the selected pet to Redux
    navigation.navigate("PetDetails", { petId: pet.id }); // Ensure correct passing of petId
  };
  


  useEffect(() => {
    // Dispatch the action to fetch pets in real-time
    dispatch(fetchPets());
  }, [dispatch]);

  const handleSearch = (searchText: string) => {
    console.log('Search Text:', searchText);
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
      <View style={styles.title}>
        <Text style={styles.newText1}>Find an</Text>
        <Text style={styles.newText3}> Awesome</Text>
        <Text style={styles.newText2}>Pets for You</Text>
      </View>
      <View style={styles.searchContainer}>
        <Search onSearch={handleSearch} />
      </View>

      <View style={styles.forYouSection}>
        <Text style={styles.sectionTitle}>For You</Text>
        {status === 'loading' ? (
          <ActivityIndicator size="large" color="#101C1D" />
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <FlatList
            data={pets}
            keyExtractor={(item) => item.id}
            renderItem={renderPet} // Render each pet item
          />
        )}
      </View>
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
    top: 140,
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
