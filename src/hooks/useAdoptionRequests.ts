import {useEffect} from 'react';
import {fetchAdoptionRequests} from '../redux/slices/petSlice';
import {useAppDispatch, useAppSelector} from '../redux/store';

export const useFetchAdoptionRequests = () => {
  const dispatch = useAppDispatch();

  const {requests, loading, error} = useAppSelector(state => state.adoptedPet);
  const currentUser = useAppSelector(state => state.auth.user);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchAdoptionRequests());
    }
  }, [dispatch, currentUser]);

  return {requests, loading, error};
};
