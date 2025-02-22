import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import {  fetchUserData, updateProfile } from '../redux/slices/authSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { useAppSelector } from './useSelector';

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, error } = useAppSelector((state) => state.auth);
  const [localPhoto, setLocalPhoto] = useState(user?.photoURL || '');

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleUpdateProfile = (username: string, photoURL: string) => {
    dispatch(updateProfile({ username, photoURL }));
  };

  const handleImageSelect = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const filePath = asset.uri;

        if (filePath) {
          const base64String = await RNFS.readFile(filePath, 'base64');
          const base64Image = `data:${asset.type};base64,${base64String}`;
          setLocalPhoto(base64Image);
          return base64Image;
        }
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
    return null;
  };

  return { user,  error, handleUpdateProfile, handleImageSelect, localPhoto, setLocalPhoto };
};

export default useProfile;
