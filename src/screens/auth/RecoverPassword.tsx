import React from 'react';
import {  Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Input from '../../components/input/Input'; 
import Buttons from '../../components/button/Buttons'; 
import useRecoverPassword from '../../hooks/useRecoverPassword'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const RecoverPassword = () => {
  const { email, setEmail, handleRecoverPassword } = useRecoverPassword(); 
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

<TouchableOpacity onPress={() => navigation.goBack()}>
  <Ionicons name="arrow-back" size={30} style={styles.backIcon} />
</TouchableOpacity>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Recover</Text>
          <Text style={styles.title1}>Password</Text>

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.descriptionText}>
            Put your email above to get a recovery URL.
          </Text>

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
    fontFamily: 'Montserrat',
    alignSelf: 'flex-start',
  },
  backIcon: { top: 20, left: 20 ,
    color:"black"
    
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
    fontFamily: 'Montserrat',
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
});

export default RecoverPassword;


