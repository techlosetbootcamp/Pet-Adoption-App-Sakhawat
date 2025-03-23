import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  KeyboardTypeOptions,
} from 'react-native';
import {InputStyles} from '../../styles/input';

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

const Input: React.FC<InputProps> = ({label, value, onChangeText, ...rest}) => {
  return (
    <View style={InputStyles.container}>
      <Text style={InputStyles.label}>{label}</Text>
      <TextInput
        style={InputStyles.input}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

export default Input;
