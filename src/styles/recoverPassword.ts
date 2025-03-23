import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';

export const recoverPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    fontFamily: FONTS.primary,
    alignSelf: 'flex-start',
  },
  title1: {
    fontSize: 36,
    fontWeight: '800',
    fontFamily: FONTS.primary,
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  descriptionText: {
    fontFamily: FONTS.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.black,
    width: 200,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});
