import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from './useSelector';
import { fetchPets, setSelectedPet } from '../redux/slices/petDonationSlice';
import { useSearch } from './useSearch';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/rootStackParamList';
import { Pet } from '../types/pets';

const filters = [ 'Dog', 'Cat', 'Bunny', 'Bird'];

export const useHome = () => {
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
    searchPets(searchText, selectedFilter);
  };

  // const handleFilterSelect = (filter: string) => {
  //   setSelectedFilter(filter);
  //   searchPets(query, filter.toLowerCase());
  // };

  const handleNavigateToDetails = (pet: Pet) => {
    dispatch(setSelectedPet(pet));
    navigation.navigate('PetDetails', { petId: pet.id });
  };

  const filteredPets = query || selectedFilter !== 'All' ? results : pets;

  return {
    filters,
    filteredPets,
    status,
    error,
    selectedFilter,
    handleSearch,
    // handleFilterSelect,
    handleNavigateToDetails,
  };
};
