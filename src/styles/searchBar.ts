import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const searchBarStyles = StyleSheet.create({
  container: {
    top: -100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.darkgray,
    left: 4,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    position: 'absolute',
    right: 0,
    top: 23,
    transform: [{translateY: -25}],
    backgroundColor: COLORS.black,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 70,
  },
});
