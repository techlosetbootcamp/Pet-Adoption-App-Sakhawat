import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const petInfoBoxStyles = StyleSheet.create({
  infoLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    color: COLORS.orange,
  },
  infoBox: {
    backgroundColor: COLORS.lightPeach,
    padding: 10,
    borderRadius: 10,
    margin: 5,
    flex: 1,
    alignItems: 'center',
  },
});
