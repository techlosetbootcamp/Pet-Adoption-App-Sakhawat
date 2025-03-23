import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {fetchUserDetails} from '../redux/slices/petSlice';

const useUserDetails = (userId?: string) => {
  const dispatch = useAppDispatch();
  const {userData, loading, error} = useAppSelector(state => state.adoptedPet);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDetails({userId, someOption: true}));
    }
  }, [dispatch, userId]);

  return {user: userData, loading, error};
};

export default useUserDetails;
