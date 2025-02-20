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
  const user = useSelector((state: RootState) => state.auth.user); // Get user from Redux
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setPets([]); // Clear pets if user is not logged in
      setLoading(false);
      return;
    }

    console.log("Fetching pets for user ID:", user.uid);

    setLoading(true);
    const unsubscribe = firestore()
      .collection('pets')
      .where('userId', '==', user.uid) // Fetch pets where 'userId' matches logged-in user
      .onSnapshot(
        (querySnapshot) => {
          if (querySnapshot.empty) {
            console.log("No pets found for this user.");
          } else {
            console.log("Fetched pets:", querySnapshot.docs.map((doc) => doc.data()));
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
