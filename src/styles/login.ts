import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';

export const loginStyles = StyleSheet.create({
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
    textAlign: 'left',
    fontFamily: FONTS.primary,
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 20,
    marginTop: -10,
    fontFamily: FONTS.primary,
    alignSelf: 'flex-end',
    marginRight: 20,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginRight: 20,
  },
  checkboxText: {
    fontSize: 14,
    color: COLORS.darkgray,
    fontFamily: FONTS.primary,
    flexShrink: 1,
    marginLeft: 8,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: COLORS.darkgray,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: COLORS.black,
    width: 200,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },
  signUpButton: {
    backgroundColor: COLORS.white,
    width: 200,
    marginTop: 20,
  },
  signUpButtonText: {
    color: COLORS.black,
    fontSize: 18,
  },
  googleButton: {
    backgroundColor: COLORS.black,
    width: 200,
  },
  googleButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});
