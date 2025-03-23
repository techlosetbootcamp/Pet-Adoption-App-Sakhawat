import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 130,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    top: -60,
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: COLORS.yellow,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.mediumGray,
  },
  activeFilterText: {
    color: COLORS.white,
  },
  petImage: {
    width: 190,
    height: 170,
    borderRadius: 10,
    top: -30,
    left: -15,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  favoriteIcon: {position: 'absolute', right: 20, top: 80},

  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.red,
    marginTop: 10,
  },
});
