import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Pet} from '../types/pets';
import {useAppSelector} from '../redux/store';
import {FIREBASE_COLLECTIONS} from '../constants/firebase';

interface RootState {
  auth: {
    user: {
      uid: string;
    } | null;
  };
}

const useMyDonation = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
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
      .collection(FIREBASE_COLLECTIONS.pets)
      .where('userId', '==', user.uid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
        } else {
        }

        const petsData: Pet[] = querySnapshot.docs?.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Pet[];
        setPets(petsData);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [user?.uid]);

  return {pets, loading};
};

export default useMyDonation;
