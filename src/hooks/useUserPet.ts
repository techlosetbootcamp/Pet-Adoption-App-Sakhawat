import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

interface Pet {
  id: string;
  name: string;
  age: string;
  location: string;
  gender: string;
  image?: string;
  userId: string;
}

const useUserPets = (userId: string | null) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection('pets')
      .where('userId', '==', userId)
      .onSnapshot(
        (querySnapshot) => {
          const petsData: Pet[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Pet[];
          setPets(petsData);
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching Firestore data:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [userId]);

  return { pets, loading };
};

export default useUserPets;
