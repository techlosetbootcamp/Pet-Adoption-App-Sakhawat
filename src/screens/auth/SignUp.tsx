import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Input from '../../components/input/Input';
import Buttons from '../../components/buttons/Buttons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/AppNavigator';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice'; // ✅ Use registerUser instead
import { AppDispatch } from '../../redux/store';

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Sign Up
  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    try {
      // ✅ Dispatch registerUser instead of signUpUser
      const resultAction = await dispatch(registerUser({ username, email, password }));
      
      if (registerUser.fulfilled.match(resultAction)) {
        navigation.navigate('Login'); 
      } else {      }
    } catch (error) {
      setErrorMessage('Failed to sign up. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Sign Up</Text>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <Input label="Username" value={username} onChangeText={setUsername} />
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />

          <Buttons
            title="Sign Up"
            onPress={handleSignUp}
            buttonStyle={{ backgroundColor: '#101C1D', width: 200 }}
            textStyle={{ color: '#FFF', fontSize: 18 }}
          />

          <Buttons
            title="Login"
            onPress={handleLoginRedirect}
            buttonStyle={{ backgroundColor: '#FFF', width: 200, marginTop: 20 }}
            textStyle={{ color: '#101C1D', fontSize: 18 }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 36, fontWeight: '800', textAlign: 'left', fontFamily: 'Montserrat', marginBottom: 30, alignSelf: 'flex-start' },
  errorText: { color: 'red', fontSize: 14, marginBottom: 10, textAlign: 'center' },
});

export default SignUp;
