import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const petCategoryStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.gray,
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.darkgray,
  },
});
