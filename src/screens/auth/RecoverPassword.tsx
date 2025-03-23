import React from 'react';
import {
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Input from '../../components/input/Input';
import Buttons from '../../components/button/Button';
import useRecoverPassword from '../../hooks/useRecoverPassword';
import BackButton from '../../components/backbutton/BackButton';
import {recoverPasswordStyles} from '../../styles/recoverPassword';

const RecoverPassword = () => {
  const {email, setEmail, handleRecoverPassword} = useRecoverPassword();

  return (
    <KeyboardAvoidingView
      style={recoverPasswordStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <BackButton />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={recoverPasswordStyles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <Text style={recoverPasswordStyles.title}>Recover</Text>
          <Text style={recoverPasswordStyles.title1}>Password</Text>

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={recoverPasswordStyles.descriptionText}>
            Put your email above to get a recovery URL.
          </Text>

          <Buttons
            title="Recover"
            onPress={handleRecoverPassword}
            buttonStyle={recoverPasswordStyles.button}
            textStyle={recoverPasswordStyles.buttonText}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RecoverPassword;
