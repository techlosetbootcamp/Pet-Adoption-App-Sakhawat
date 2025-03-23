import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const tabstyles = StyleSheet.create({
  tabBar: {
    height: 60,
    borderTopWidth: 0,
  },
  iconContainer: {},
  activeTab: {},
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTab: {
    backgroundColor: COLORS.darkgray,
    borderRadius: 25,
  },
});
