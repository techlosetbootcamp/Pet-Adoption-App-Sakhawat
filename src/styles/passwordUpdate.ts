import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const passwordUpdateStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 20,
  },
  updateButton: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  errorText: {
    marginBottom: 15,
  },
});
