// useRecoverPassword.js
import { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth'; // Correct import for Firebase Auth

const useRecoverPassword = () => {
  const [email, setEmail] = useState('');

  const handleRecoverPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Success', 'Password reset email sent! Check your inbox.');
    } catch (error) {
    }
  };

  return {
    email,
    setEmail,
    handleRecoverPassword,
  };
};

export default useRecoverPassword;
