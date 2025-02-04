// import React, { useState } from 'react';
// import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import Search from '../../components/search/Searchbar'; // Ensure correct path
// import { useSearch } from '../../hooks/useSearch';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFilter } from '../../redux/slices/filterSlice';
// import { RootState } from '../../redux/store';
// const filters = ['Dog', 'Cat', 'Bunny', 'Bird', 'Turtle'];

// export default function SearchScreen() {
//   const [query, setQuery] = useState('');
//   const { results, loading, error, searchPets, handleClick } = useSearch();
//   const selectedFilter = useSelector((state: RootState) => state.Filter.category);
//   const dispatch = useDispatch();

//   const handleSearch = (searchText: string) => {
//     setQuery(searchText);
//     searchPets(searchText, selectedFilter); // Filter by selected category
//     console.log(searchText);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <Search onSearch={handleSearch} />

//       {/* Filters */}
//       <View style={styles.filterContainer}>
//         {filters.map((item) => (
//           <TouchableOpacity
//             key={item}
//             style={[styles.filterButton, selectedFilter === item && styles.activeFilter]}
//             onPress={() => handleClick(item)}
//           >
//             <Text style={[styles.filterText, selectedFilter === item && styles.activeFilterText]}>
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
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             {/* Display Image */}
//             <Image source={{ uri: item.image}} style={styles.petImage} />
            
//             {/* Pet Info */}
//             <View style={styles.infoContainer}>
//               <Text style={styles.petName}>{item.name}</Text>
//               <Text>Age: {item.age} Months</Text>
//               <Text>Breed: {item.breed}</Text>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     top: 120,
//     padding: 16,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//   },
//   filterButton: {
//     padding: 10,
//     borderRadius: 20,
//     backgroundColor: '#EEE',
//     top: -70,
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
//     padding: 12,
//     borderRadius: 10,
//     marginVertical: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
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

import React, { useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Search from '../../components/search/Searchbar'; // Ensure correct path
import { useSearch } from '../../hooks/useSearch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Import useNavigation and NavigationProp
import { RootStackParamList } from '../../navigations/RootStackParamList'; // Import RootStackParamList

const filters = ['Dog', 'Cat', 'Bunny', 'Bird', 'Turtle'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { results, loading, error, searchPets, handleClick } = useSearch();
  const selectedFilter = useSelector((state: RootState) => state.Filter.category);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Initialize navigation with type

  const handleSearch = (searchText: string) => {-
    setQuery(searchText);
    searchPets(searchText, selectedFilter); // Filter by selected category
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Search onSearch={handleSearch} />

      {/* Filters */}
      <View style={styles.filterContainer}>
        {filters.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.filterButton, selectedFilter === item && styles.activeFilter]}
            onPress={() => handleClick(item)}
          >
            <Text style={[styles.filterText, selectedFilter === item && styles.activeFilterText]}>
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('PetDetails', { petId: item.id })} // Navigate to PetDetails
          >
            {/* Display Image */}
            <Image source={{ uri: item.image }} style={styles.petImage} />
            
            {/* Pet Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.petName}>{item.name}</Text>
              <Text>Age: {item.age} Months</Text>
              <Text>Breed: {item.breed}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 120,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#EEE',
    top: -70,
    marginHorizontal: 5,
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
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  petImage: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
