import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';

export const ButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.black,
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
    fontFamily: FONTS.primary,
    color: COLORS.white,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
