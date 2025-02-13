// import React, {useState} from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import Search from '../../components/search/Searchbar'; // Ensure correct path
// import {useSearch} from '../../hooks/useSearch';
// import {useDispatch, useSelector} from 'react-redux';
// import {RootState} from '../../redux/store';
// import {useNavigation, NavigationProp} from '@react-navigation/native'; // Import useNavigation and NavigationProp
// import {RootStackParamList} from '../../navigations/RootStackParamList'; // Import RootStackParamList

// const filters = ['Dog', 'Cat', 'Bunny', 'Bird', 'Turtle'];

// export default function SearchScreen() {
//   const [query, setQuery] = useState('');
//   const {results, loading, error, searchPets, handleClick} = useSearch();
//   const selectedFilter = useSelector(
//     (state: RootState) => state.Filter.category,
//   );
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Initialize navigation with type

//   const handleSearch = (searchText: string) => {
//     -setQuery(searchText);
//     searchPets(searchText, selectedFilter); // Filter by selected category
//   };

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <Search onSearch={handleSearch} />
//       {/* 
//       Filters
//       */}
//       <View style={styles.filterContainer}>
//         {filters.map(item => (
//           <TouchableOpacity
//             key={item}
//             style={[
//               styles.filterButton,
//               selectedFilter === item && styles.activeFilter,
//             ]}
//             onPress={() => handleClick(item)}>
//             <Text
//               style={[
//                 styles.filterText,
//                 selectedFilter === item && styles.activeFilterText,
//               ]}>
//               {item}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Display Results */}
//       {loading && <ActivityIndicator size="large" color="#0000ff" />}
//       {error && <Text style={styles.errorText}>{error}</Text>}

//       <FlatList
//         data={results}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => navigation.navigate('PetDetails', {petId: item.id})} // Navigate to PetDetails
//           >
//             {/* Display Image */}
//             <Image source={{uri: item.image}} style={styles.petImage} />

//             {/* Pet Info */}
//             <View style={styles.infoContainer}>
//               <Text style={styles.petName}>{item.name}</Text>
//               <Text>Age: {item.age} Months</Text>
//               <Text>Breed: {item.breed}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 130,
//     padding: 16,
//     backgroundColor: '#f00',
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     // top: -30,
//   },
//   filterButton: {
//     padding: 15,
//     borderRadius: 20,
//     backgroundColor: '#EEE',
//     top: -90,
//     marginHorizontal: 5,
//   },
//   activeFilter: {
//     backgroundColor: '#FFB830',
//   },
//   filterText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   activeFilterText: {
//     color: '#fff',
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     elevation: 5,
//     top: -80,
//     borderColor: '#000',
//     borderWidth: 1,
//     height: 100,
//   },
//   petImage: {
//     width: 80,
//     height: 80,
//     backgroundColor: '#ccc',
//     borderRadius: 10,
//   },
//   infoContainer: {
//     marginLeft: 10,
//     flex: 1,
//   },
//   petName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 10,
//   },
// });
import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Search from '../../components/search/Searchbar'; // Ensure correct path
import {useSearch} from '../../hooks/useSearch';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useNavigation, NavigationProp} from '@react-navigation/native'; // Import useNavigation and NavigationProp
import {RootStackParamList} from '../../navigations/RootStackParamList'; // Import RootStackParamList

const filters = ['Dogs', 'Cats', 'Bunnies', 'Birds', 'Turtles'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const {results, loading, error, searchPets, handleClick} = useSearch();
  const selectedFilter = useSelector(
    (state: RootState) => state.Filter.category,
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Initialize navigation with type

  const handleSearch = (searchText: string) => {
    setQuery(searchText);
    searchPets(searchText, selectedFilter); // Filter by selected category
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Search onSearch={handleSearch} />
      {/* Filters */}
      <View style={styles.filterContainer}>
        {filters.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              selectedFilter === item && styles.activeFilter,
            ]}
            onPress={() => handleClick(item)}>
            <Text
              style={[
                styles.filterText,
                selectedFilter === item && styles.activeFilterText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display Results */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PetDetails', {petId: item.id})}>
            {/* Display Image */}
            <View style={styles.imagePlaceholder} />
            {/* Pet Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.petName}>{item.name}</Text>
              <Text style={styles.petDetails}>Age {item.age} Months</Text>
              <Text style={styles.petDetails}>{item.breed}</Text>
              <View style={styles.locationRow}>
                <Text style={styles.petDetails}>FSD</Text>
                <Text style={styles.locationPin}>📍</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.heartIcon}>❤️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'FFFFFF',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#EEE',
  },
  activeFilter: {
    backgroundColor: '#FFB830',
  },
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  activeFilterText: {
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  petDetails: {
    fontSize: 12,
    color: '#777',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationPin: {
    fontSize: 12,
    marginLeft: 4,
  },
  heartIcon: {
    fontSize: 20,
    color: '#FF5A5F',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});