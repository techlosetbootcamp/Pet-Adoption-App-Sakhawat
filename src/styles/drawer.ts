import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const DrawerStyles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 30,
    zIndex: 1,
  },
  searchContainer: {
    width: '100%',
    top: 160,
    marginBottom: 130,
  },
  logoutContainer: {
    marginTop: 'auto',
    paddingBottom: 20,
  },
  logoutLabel: {
    color: COLORS.red,
    fontWeight: 'bold',
  },
});
