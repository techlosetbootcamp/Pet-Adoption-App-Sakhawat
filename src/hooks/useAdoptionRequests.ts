import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAdoptionRequests } from '../redux/slices/adoptedPetSlice';
import { useAppSelector } from './useSelector';
import { AppDispatch } from '../redux/store';

export const useFetchAdoptionRequests = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Use `useAppSelector` to get current user and requests
  const { requests, loading, error } = useAppSelector((state) => state.adoptedPet);
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchAdoptionRequests());
    }
  }, [dispatch, currentUser]);

  return { requests, loading, error };
};
