import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Input from '../../components/input/Input';
import Buttons from '../../components/buttons/Buttons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/AppNavigator';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Initialize navigation
  const dispatch = useDispatch<AppDispatch>(); // Initialize dispatch for Redux

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For handling error messages

  // Handle Sign Up
  const handleSignUp = async () => {
    // Check if all fields are filled
    if (!username || !email || !password) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    try {
      // Dispatch the sign-up action to Redux, using Firebase to create the user
      const resultAction = await dispatch(signUpUser({ username, email, password }));
      
      if (signUpUser.fulfilled.match(resultAction)) {
        navigation.navigate('Login'); // Redirect to login after successful sign-up
      } else {
        // Handle failed sign-up
        setErrorMessage(resultAction.payload as string || 'Failed to sign up. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Failed to sign up. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    // Navigate to Login page
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Sign Up</Text>

          {/* Display error message if any */}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          {/* Username Input */}
          <Input label="Username" value={username} onChangeText={setUsername} />

          {/* Email Input */}
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

          {/* Password Input */}
          <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />

          {/* Sign Up Button */}
          <Buttons
            title="Sign Up"
            onPress={handleSignUp} // This calls handleSignUp when clicked
            buttonStyle={{
              backgroundColor: '#101C1D',
              width: 200,
            }}
            textStyle={{
              color: '#FFF',
              fontSize: 18,
            }}
          />

          {/* Login Button */}
          <Buttons
            title="Login"
            onPress={handleLoginRedirect} // Calls the function to navigate to Login
            buttonStyle={{
              backgroundColor: '#FFF',
              width: 200,
              marginTop: 20, // Space between the SignUp and Login button
            }}
            textStyle={{
              color: '#101C1D', // Black text color
              fontSize: 18,
            }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'left',
    fontFamily: 'Montserrat',
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default SignUp;
