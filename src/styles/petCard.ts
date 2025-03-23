import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const petCardStyles = StyleSheet.create({
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
    height: 170,
    overflow: 'hidden',
    marginTop: 40,
  },
});
