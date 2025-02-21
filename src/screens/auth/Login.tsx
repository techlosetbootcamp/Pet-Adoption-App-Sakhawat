import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';
import Input from '../../components/input/Input'; 
import Buttons from '../../components/buttons/Buttons'; 
import useLogin from '../../hooks/useLogin'; // Import custom hook
import CheckBox from 'react-native-check-box';

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
    handleCheckBox, // Use this function to toggle checkbox
    GooglePress,
    isLoading,
    error,
  } = useLogin(); // Use custom hook

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Login</Text>

          {/* Email Input */}
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Password Input */}
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Forgot Password */}
          <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
            Forgot Password?
          </Text>

          {/* Checkbox and Terms Agreement */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              isChecked={isChecked}
              onClick={handleCheckBox} // Toggle checkbox state
              checkBoxColor="    color: '#333',
 "
            />
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
            buttonStyle={{ backgroundColor: '#101C1D', width: 200 }}
            textStyle={{ color: '#FFF', fontSize: 18 }}
          />

          {/* Sign Up Button */}
          <Buttons
            title="Sign Up"
            onPress={handleSignUp}
            isLoading={isLoading}
            buttonStyle={{ backgroundColor: '#FFF', width: 200, marginTop: 20 }}
            textStyle={{ color: '#101C1D', fontSize: 18 }}
          />

          {/* Google Sign-In Button */}
          <Buttons
            title={googleLoader ? 'Loading...' : 'Sign in with Google'}
            onPress={GooglePress}
            isLoading={isLoading}
            buttonStyle={{
              backgroundColor: '#DB4437',
              width: 200,
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            textStyle={{ color: '#FFF', fontSize: 18 }}
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
    marginLeft: 8, // Add spacing between checkbox and text
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Login;
