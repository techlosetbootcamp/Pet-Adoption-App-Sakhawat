import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'; // Use Redux hooks
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CheckBox from '@react-native-community/checkbox';
import { loginUser } from '../../redux/slices/authSlice'; // Import the action from authSlice
import Input from '../../components/input/Input';
import Buttons from '../../components/buttons/Buttons';
import { AppDispatch } from '../../redux/store';  // Import AppDispatch from store



type RootStackParamList = {
  MainApp: undefined;
  Login: undefined;
  RecoverPassword: undefined;
  SignUp: undefined;
};

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const dispatch = useDispatch<AppDispatch>();  // Type dispatch with AppDispatch

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const { isLoading, error, user } = useSelector((state: any) => state.auth); // Access state from authSlice

  // Handle login process
  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    
    console.log('loginUser 2')
    // if (!isChecked) {
    //   return;
    // }

    // Dispatch the login action
    console.log('loginUser 3')
    await dispatch(loginUser({ email, password }));
  };

  // Navigate to Forgot Password
  const handleForgotPassword = () => {
    navigation.navigate('RecoverPassword');
  };

  // Navigate to Sign Up
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  // Handle checkbox toggle
  const handleCheckBox = () => {
    setIsChecked((prevState) => !prevState);
  };

  // Navigate to MainApp if user is authenticated
  if (user) {
    navigation.navigate('MainApp');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Login</Text>

          {/* Email Input */}
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

          {/* Password Input */}
          <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />

          {/* Forgot Password */}
          <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
            Forgot Password?
          </Text>

          {/* Checkbox and Text */}
          <View style={styles.checkboxContainer}>
            {/* <CheckBox value={isChecked} onValueChange={handleCheckBox} boxType="square" tintColors={{ true: '#101C1D', false: '#ccc' }} /> */}
            <Text style={styles.checkboxText}>
              I agree to the{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
          </View>

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Login Button */}
          <Buttons
            title="Login"
            onPress={handleLogin}
            isLoading={isLoading}
            buttonStyle={{
              backgroundColor: '#101C1D',
              width: 200,
            }}
            textStyle={{
              color: '#FFF',
              fontSize: 18,
            }}
          />

          {/* Sign Up Button */}
          <Buttons
            title="Sign Up"
            onPress={handleSignUp}
            isLoading={isLoading}
            buttonStyle={{
              backgroundColor: '#FFF',
              width: 200,
              marginTop: 20,
            }}
            textStyle={{
              color: '#101C1D', // Black text
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
  forgotPasswordText: {
    fontSize: 14,
    color: '#101C1D',
    marginBottom: 20,
    marginTop: -10,
    fontFamily: 'Montserrat',
    alignSelf: 'flex-end',
    marginRight: 20,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginRight: 20,
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Montserrat',
    flexShrink: 1,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Login;

