import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from './useSelector';
import { fetchPets, setSelectedPet } from '../redux/slices/petSlice';
import { useSearch } from './useSearch';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/rootStackParamList';
import { Pet } from '../types/pets';


export const useHome = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const dispatch = useAppDispatch();
  const { pets, status, error } = useAppSelector((state) => state.adoptedPet);
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


  const handleNavigateToDetails = (pet: Pet) => {
    dispatch(setSelectedPet(pet));
    navigation.navigate('PetDetails', { petId: pet.id });
  };

  const filteredPets = query || selectedFilter !== 'All' ? results : pets;

  return {
    filteredPets,
    status,
    error,
    selectedFilter,
    handleSearch,
    handleNavigateToDetails,
  };
};
