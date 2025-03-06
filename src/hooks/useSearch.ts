import { useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import { useAppDispatch } from './useSelector';
import { setFilter } from '../redux/slices/filterSlice';
import { Pet } from '../types/pets';


export const useSearch = () => {
  const [results, setResults] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const disptch = useAppDispatch();



  
  const searchPets = async (searchText: string, category: string) => {
    setLoading(true);
    setError(null);

    try {
      if (!searchText.trim()) {
        setError('Search text cannot be empty');
        return;
      }
  
      const q = firestore()
        .collection('pets')
        .where('name', '>=', searchText)
        .where('name', '<=', searchText + '\uf8ff')
  
      const snapshot = await q.get();
  
      if (snapshot.empty) {
        setError('No pets found matching the search criteria.');
        return;
      }
  
      
      const resultsData: Pet[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Pet),
        id: doc.id,
      }));
  
      setResults(resultsData);
    } catch (error) {
      setError('Failed to fetch pets.');
    } finally {
      setLoading(false);
    }
  };

  const getData = async (category_: string) => {
    const q = firestore().collection('pets').where('type', '==', category_);
    const querySnapshot = await q.get();
    const pets: Pet[] = [];
    querySnapshot.forEach((doc) => {
      pets.push({ ...(doc.data() as Pet), id: doc.id });
    });
    return pets;
  }

  const handleClick = async (_category: string) => {
    disptch(setFilter(_category));
    const data = await getData(_category);
    setResults(data);
  }

  return { results, loading, error, searchPets, handleClick };
};

