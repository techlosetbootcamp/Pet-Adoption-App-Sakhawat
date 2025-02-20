import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useAppDispatch, useAppSelector } from './useSelector';
import { fetchUserDetails } from '../redux/slices/petDetailsSlice';
import { AppDispatch } from '../redux/store';

const useUserDetails = (userId?: string) => {
  const dispatch = useAppDispatch();
  const { userDetails, loading, error } = useAppSelector(
    (state) => state.petDetails
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDetails(userId));
    }
  }, [dispatch, userId]);

  return { user: userDetails, loading, error };
};


export default useUserDetails;


// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';

// const usePetDetails = (petId: string) => {
//   const selectedPet = useSelector((state: RootState) => 
//     state.petDetails.selectedPet?.id === petId ? state.petDetails.selectedPet : null
//   );

//   return { pet: selectedPet };
// };

// export default usePetDetails;
