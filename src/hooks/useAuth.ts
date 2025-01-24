import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { loginUser } from '../redux/slices/authSlice'; // Import the loginUser action
import { selectAuthState } from '../redux/slices/authSlice'; // Import the selector

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => selectAuthState(state));

  // Renamed to avoid conflict with loginUser action
  const handleLogin = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  return {
    isLoading,
    error,
    login: handleLogin, // Return as `login` for simplicity
  };
};

export default useAuth;
