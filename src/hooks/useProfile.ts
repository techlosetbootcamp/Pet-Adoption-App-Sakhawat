import {useEffect, useState} from 'react';
import {fetchUserData, updateProfile} from '../redux/slices/authSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {useAppDispatch, useAppSelector} from '../redux/store';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const {user, error} = useAppSelector(state => state.auth);
  const [localPhoto, setLocalPhoto] = useState(user?.photoURL || '');

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleUpdateProfile = (username: string, photoURL: string) => {
    dispatch(updateProfile({username, photoURL}));
  };

  const handleImageSelect = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});

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
    } catch (error) {}
    return null;
  };

  return {
    user,
    error,
    handleUpdateProfile,
    handleImageSelect,
    localPhoto,
    setLocalPhoto,
  };
};

export default useProfile;
