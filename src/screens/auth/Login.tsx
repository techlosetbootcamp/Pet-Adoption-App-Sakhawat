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
import Buttons from '../../components/button/Buttons'; 
import useLogin from '../../hooks/useLogin'; 
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
    handleCheckBox, 
    GooglePress,
    isLoading,
    error,
  } = useLogin(); 

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

          <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
            Forgot Password?
          </Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              isChecked={isChecked}
              onClick={handleCheckBox} 
              checkBoxColor="    color: '#333',
 "
            />
            <Text style={styles.checkboxText}>
              I agree to the{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Buttons
            title="Login"
            onPress={handleLogin}
            isLoading={isLoading}
            buttonStyle={{ backgroundColor: '#101C1D', width: 200 }}
            textStyle={{ color: '#FFF', fontSize: 18 }}
          />

          <Buttons
            title="Sign Up"
            onPress={handleSignUp}
            isLoading={isLoading}
            buttonStyle={{ backgroundColor: '#FFF', width: 200, marginTop: 20 }}
            textStyle={{ color: '#101C1D', fontSize: 18 }}
          />

          <Buttons
            title={googleLoader ? 'Loading...' : 'Sign in with Google'}
            onPress={GooglePress}
            isLoading={isLoading}
            buttonStyle={{ backgroundColor: '#101C1D', width: 200 }}
            
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
    fontWeight: 'bold', 
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
    marginLeft: 8,
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
