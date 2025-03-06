import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonsProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  buttonStyle?: ViewStyle; 
  textStyle?: TextStyle;   
    disabled?: boolean;
}

const Buttons: React.FC<ButtonsProps> = ({
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
        styles.button,
        buttonStyle,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#101C1D',
    width: 185,
    height: 62,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    color: 'white',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default Buttons;
