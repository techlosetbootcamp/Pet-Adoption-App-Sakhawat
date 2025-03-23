import {useState} from 'react';
import {registerUser} from '../redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/rootStackParamList';
import {useAppDispatch} from '../redux/store';

const useSignUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    try {
      const resultAction = await dispatch(
        registerUser({username, email, password}),
      );
      if (registerUser.fulfilled.match(resultAction)) {
        navigation.navigate('Login');
      } else {
        setErrorMessage('Failed to sign up. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Failed to sign up. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  return {
    username,
    email,
    password,
    errorMessage,
    setUsername,
    setEmail,
    setPassword,
    handleSignUp,
    handleLoginRedirect,
  };
};

export default useSignUp;
