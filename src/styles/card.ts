import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const CardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 30,
    marginVertical: 8,
    shadowColor: COLORS.black,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    top: 20,
    height: 130,
    width: '95%',
    marginBottom: 60,
  },
});
