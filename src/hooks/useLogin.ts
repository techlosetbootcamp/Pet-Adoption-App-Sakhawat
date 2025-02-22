import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loginUser, onGoogleButtonPress, setUser } from '../redux/slices/authSlice';
import { RootStackParamList } from '../types/rootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from './useSelector';
import {  ToastAndroid } from 'react-native';


const useLogin = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);

  const { isLoading, error, user } = useAppSelector((state) => state.auth); // Fetch state from redux

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }

    await dispatch(loginUser({ email, password }));
  };

  const handleForgotPassword = () => {
    navigation.navigate('RecoverPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleCheckBox = () => {
    setIsChecked(prevState => !prevState);
  };

  const GooglePress = async () => {
    try {
      setGoogleLoader(true);
      const user = await onGoogleButtonPress(); 
      ToastAndroid.show("Google Login clicked", ToastAndroid.LONG)
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
    } finally {
      setGoogleLoader(false);
    }
  };

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
