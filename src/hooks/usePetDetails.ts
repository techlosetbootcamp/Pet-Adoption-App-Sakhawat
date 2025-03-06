import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useSelector';
import { fetchUserDetails } from '../redux/slices/petDetailsSlice';

const useUserDetails = (userId?: string) => {
  const dispatch = useAppDispatch();
  const { userData, loading, error } = useAppSelector(
    (state) => state.petDetails
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDetails(userId));
    }
  }, [dispatch, userId]);

  return { user: userData, loading, error };
};


export default useUserDetails;
