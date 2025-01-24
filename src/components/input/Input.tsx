import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({ label, value, onChangeText, ...rest }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
    fontFamily: 'Montserrat',
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingBottom: 5,
  },
});

export default Input;
