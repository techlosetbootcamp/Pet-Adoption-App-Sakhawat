import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {RootState} from '../redux/store';
import {fetchPets} from '../redux/slices/petSlice';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {FIREBASE_COLLECTIONS} from '../constants/firebase';
const useFavorites = () => {
  const dispatch = useAppDispatch();
  const [favoritePetIds, setFavoritePetIds] = useState<string[]>([]);
  const allPets = useAppSelector((state: RootState) => state.adoptedPet.pets);

  useEffect(() => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;

    const unsubscribe = firestore()
      .collection(FIREBASE_COLLECTIONS.users)
      .doc(userId)
      .onSnapshot(
        doc => {
          if (doc.exists) {
            const userData = doc.data();
            setFavoritePetIds(userData?.favorites || []);
          }
        },
        error => {},
      );

    dispatch(fetchPets());

    return () => unsubscribe();
  }, [dispatch]);

  const favoritePets = allPets.filter(pet => favoritePetIds.includes(pet.id));

  return favoritePets;
};

export default useFavorites;
