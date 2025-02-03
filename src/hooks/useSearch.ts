import { useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore'

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  location: string;
  image: string;
}

export const useSearch = () => {
  const [results, setResults] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPets = async (searchText: string, category: string) => {
    setLoading(true);
    setError(null);

    try {
      // Validate the inputs
      if (!searchText.trim()) {
        setError('Search text cannot be empty');
        return;
      }
  
      // Firestore query (using the android setup)
      const q = firestore()
        .collection('pets')
        .where('name', '>=', searchText)
        .where('name', '<=', searchText + '\uf8ff')
  
      // Get the query snapshot
      const snapshot = await q.get();
  
      // Check if results exist
      if (snapshot.empty) {
        setError('No pets found matching the search criteria.');
        return;
      }
  
      
      // Process the results and set them to the state
      const resultsData: Pet[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Pet),
        id: doc.id,
      }));
  
      setResults(resultsData);
    } catch (error) {
      console.error('Firestore fetch error:', error); // Log the actual error to debug
      setError('Failed to fetch pets.');
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchPets };
};
