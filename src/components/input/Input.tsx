import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, KeyboardTypeOptions } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}
interface InputProps {

  label: string;

  value: string;

  onChangeText: (value: string) => void;

  keyboardType?: KeyboardTypeOptions;

  multiline?: boolean;

  options?: string[];

  isDropdown?: boolean;

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
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    fontFamily: 'Montserrat',
    
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingBottom: 5,
  },
});

export default Input;
