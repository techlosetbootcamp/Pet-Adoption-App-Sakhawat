import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    top: -130,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    top: -110,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  placeholderText: {
    color: COLORS.gray,
    fontSize: 24,
  },
  button: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
});
