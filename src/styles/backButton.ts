import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const BackButtonStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  icon: {
    color: COLORS.black,
  },
});
