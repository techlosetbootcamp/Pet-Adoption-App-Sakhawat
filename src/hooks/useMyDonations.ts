import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { Pet } from '../types/pets';

interface RootState {
  auth: {
    user: {
      uid: string;
    } | null;
  };
}

const useMyDonation = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setPets([]);
      setLoading(false);
      return;
    }


    setLoading(true);
    const unsubscribe = firestore()
      .collection('pets')
      .where('userId', '==', user.uid) 
      .onSnapshot(
        (querySnapshot) => {
          if (querySnapshot.empty) {
          } else {
          }

          const petsData: Pet[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Pet[];
          setPets(petsData);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching Firestore data:", error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [user?.uid]);

  return { pets, loading };
};

export default useMyDonation;
