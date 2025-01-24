import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Input from '../../components/input/Input'; // Assuming you have the Input component
import Buttons from '../../components/buttons/Buttons'; // Assuming you have the Buttons component

const RecoverPassword = () => {
  const [email, setEmail] = useState('');

  const handleRecoverPassword = () => {
    if (email) {
    } else {
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Recover</Text>
          <Text style={styles.title1}>Password</Text>

          {/* Email Input */}
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Description Text */}
          <Text style={styles.descriptionText}>
            Put your email above to get recovery URL
          </Text>

          {/* Recover Button */}
          <Buttons
            title="Recover"
            onPress={handleRecoverPassword}
            buttonStyle={{
              backgroundColor: '#101C1D',
              width: 200,
            }}
            textStyle={{
              color: '#FFF',
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
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  descriptionText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
    marginTop: 10, 
    marginBottom: 20, 
  },
  title1: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'left',
    fontFamily: 'Montserrat',
    marginBottom: 30,
    alignSelf: 'flex-start',
    
  },
});

export default RecoverPassword;
