import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginUser, onGoogleButtonPress, setUser } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RootStackParamList } from '../types/rootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GOOGLE_CLIENT_ID } from '@env';
GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID, // Your webClientId for Google Sign-In
});

const useLogin = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Navigation typing
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);

  const { isLoading, error, user } = useSelector((state: any) => state.auth); // Fetch state from redux

  // Handle email/password login
  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }

    await dispatch(loginUser({ email, password }));
  };

  // Navigate to Forgot Password page
  const handleForgotPassword = () => {
    navigation.navigate('RecoverPassword');
  };

  // Navigate to Sign Up page
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  // Handle checkbox toggle (for Remember Me or similar)
  const handleCheckBox = () => {
    setIsChecked(prevState => !prevState);
  };

  // Google Sign-In
  const GooglePress = async () => {
    try {
      setGoogleLoader(true);
      const user = await onGoogleButtonPress(); // Handles Google login
      dispatch(setUser(user)); // Store the logged-in user in Redux
    } catch (error) {
      console.error(error);
    } finally {
      setGoogleLoader(false);
    }
  };

  // Navigate to the main app once the user is authenticated
  if (user) {
    navigation.navigate('MainApp');
  }

  return {
    email,
    password,
    isChecked,
    googleLoader,
    setEmail,
    setPassword,
    handleLogin,
    handleForgotPassword,
    handleSignUp,
    handleCheckBox,
    GooglePress,
    isLoading,
    error,
  };
};

export default useLogin;
