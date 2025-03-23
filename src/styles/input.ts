import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';

export const InputStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.darkgray,
    fontFamily: FONTS.primary,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingBottom: 5,
  },
});
