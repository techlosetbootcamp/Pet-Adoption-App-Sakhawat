import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, 
  Platform, Keyboard, TouchableWithoutFeedback 
} from 'react-native';
import Input from '../../components/input/Input';
import Buttons from '../../components/buttons/Buttons';
import useSignUp from '../../hooks/useSignUp'; // Import the custom hook
import CheckBox from 'react-native-check-box';

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
  } = useSignUp(); // Use the custom hook

  // ✅ Manage checkbox state
  const [isChecked, setIsChecked] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Sign Up</Text>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <Input label="Username" value={username} onChangeText={setUsername} />
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />

          {/* ✅ Checkbox and Terms Agreement */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              isChecked={isChecked}
              onClick={() => setIsChecked(!isChecked)} // Toggle checkbox state
              checkBoxColor="#333" // Fixed color
            />
            <Text style={styles.checkboxText}>
              I agree to the{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
          </View>

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

export default SignUp;
