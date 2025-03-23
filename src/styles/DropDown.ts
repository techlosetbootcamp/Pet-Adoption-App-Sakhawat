import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const DropDwonStyles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  pickerContainer: {
    borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.black,
    paddingHorizontal: 10,
    position: 'relative',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -10,
  },
});
