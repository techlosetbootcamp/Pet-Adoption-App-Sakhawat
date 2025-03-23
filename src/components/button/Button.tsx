import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {ButtonStyles} from '../../styles/button';

interface ButtonsProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonsProps> = ({
  title,
  onPress,
  isLoading = false,
  buttonStyle,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        ButtonStyles.button,
        buttonStyle,
        disabled && ButtonStyles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <Text style={[ButtonStyles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
