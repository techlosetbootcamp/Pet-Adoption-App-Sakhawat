import React, {useState} from 'react';
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
import useSignUp from '../../hooks/useSignUp';
import CheckBox from 'react-native-check-box';
import {COLORS} from '../../constants/colors';
import {signUpStyles} from '../../styles/signUp';

const SignUp = () => {
  const {
    username,
    email,
    password,
    errorMessage,
    setUsername,
    setEmail,
    setPassword,
    handleSignUp,
    handleLoginRedirect,
  } = useSignUp();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <KeyboardAvoidingView
      style={signUpStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={signUpStyles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <Text style={signUpStyles.title}>Sign Up</Text>

          {errorMessage ? (
            <Text style={signUpStyles.errorText}>{errorMessage}</Text>
          ) : null}

          <Input label="Username" value={username} onChangeText={setUsername} />
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

          <View style={signUpStyles.checkboxContainer}>
            <CheckBox
              isChecked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
              checkBoxColor={COLORS.darkgray}
            />
            <Text style={signUpStyles.checkboxText}>
              I agree to the{' '}
              <Text style={signUpStyles.linkText}>Terms of Service</Text> and{' '}
              <Text style={signUpStyles.linkText}>Privacy Policy</Text>.
            </Text>
          </View>

          <Buttons
            title="Sign Up"
            onPress={handleSignUp}
            buttonStyle={signUpStyles.signUpButton}
            textStyle={signUpStyles.signUpButtonText}
          />

          <Buttons
            title="Login"
            onPress={handleLoginRedirect}
            buttonStyle={signUpStyles.loginButton}
            textStyle={signUpStyles.loginButtonText}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
