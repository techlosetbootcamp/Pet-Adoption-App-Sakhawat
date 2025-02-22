import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useSelector';
import { fetchUserDetails } from '../redux/slices/petDetailsSlice';

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
