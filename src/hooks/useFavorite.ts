import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AppDispatch, RootState } from '../redux/store';
import { fetchPets } from '../redux/slices/petDonationSlice';

const useFavorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [favoritePetIds, setFavoritePetIds] = useState<string[]>([]);
  const allPets = useSelector((state: RootState) => state.petDonation.pets);

  useEffect(() => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setFavoritePetIds(userData?.favorites || []);
        }
      }, (error) => {
      });

    dispatch(fetchPets()); 

    return () => unsubscribe(); 
  }, [dispatch]);

  const favoritePets = allPets.filter((pet) => favoritePetIds.includes(pet.id));

  return favoritePets;
};

export default useFavorites;
