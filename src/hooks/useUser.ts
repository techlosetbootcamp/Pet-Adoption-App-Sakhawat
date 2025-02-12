import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { updateUser, setUser } from '../redux/slices/authSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from '../redux/slices/authSlice';

const useUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);

  // Listen to Firestore for real-time updates
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          if (doc.exists) {
            dispatch(setUser({ uid: currentUser.uid, ...doc.data() } as User));
          }
        });

      return () => unsubscribe();
    }
  }, [dispatch]);

  const handleUpdateProfile = async (username: string, photoURL: string) => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      try {
        // Update in Firebase Authentication
        await currentUser.updateProfile({ displayName: username });
  
        // Update in Firestore
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .set({ username, photoURL }, { merge: true });
  
        // Update in Redux store
        dispatch(updateUser({ username, photoURL }));
  
        console.log('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleImageSelect = async (setPhotoURL: (photo: string) => void) => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const filePath = asset.uri;

        if (filePath) {
          const base64String = await RNFS.readFile(filePath, 'base64');
          const base64Image = `data:${asset.type};base64,${base64String}`;
          setPhotoURL(base64Image);
        }
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  return { user, handleUpdateProfile, handleImageSelect };
};

export default useUser;
