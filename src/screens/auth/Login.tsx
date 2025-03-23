import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Input from '../../components/input/Input';
import Buttons from '../../components/button/Button';
import useLogin from '../../hooks/useLogin';
import CheckBox from 'react-native-check-box';
import {COLORS} from '../../constants/colors';
import {loginStyles} from '../../styles/login';

const Login = () => {
  const {
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
  } = useLogin();

  return (
    <KeyboardAvoidingView
      style={loginStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={loginStyles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <Text style={loginStyles.title}>Login</Text>

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text
            style={loginStyles.forgotPasswordText}
            onPress={handleForgotPassword}>
            Forgot Password?
          </Text>

          <View style={loginStyles.checkboxContainer}>
            <CheckBox
              isChecked={isChecked}
              onClick={handleCheckBox}
              checkBoxColor={COLORS.darkgray}
            />
            <Text style={loginStyles.checkboxText}>
              I agree to the{' '}
              <Text style={loginStyles.linkText}>Terms of Service</Text> and{' '}
              <Text style={loginStyles.linkText}>Privacy Policy</Text>.
            </Text>
          </View>

          {error && <Text style={loginStyles.errorText}>{error}</Text>}

          <Buttons
            title="Login"
            onPress={handleLogin}
            isLoading={isLoading}
            buttonStyle={loginStyles.loginButton}
            textStyle={loginStyles.loginButtonText}
          />

          <Buttons
            title="Sign Up"
            onPress={handleSignUp}
            isLoading={isLoading}
            buttonStyle={loginStyles.signUpButton}
            textStyle={loginStyles.signUpButtonText}
          />

          <Buttons
            title={googleLoader ? 'Loading...' : 'Sign in with Google'}
            onPress={GooglePress}
            isLoading={isLoading}
            buttonStyle={loginStyles.googleButton}
            textStyle={loginStyles.googleButtonText}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
