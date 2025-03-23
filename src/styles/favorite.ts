import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const favoriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  header: {fontSize: 24, fontWeight: 'bold'},

  headerIcon: {
    position: 'absolute',
    right: 10,
  },

  petImage: {
    width: 190,
    height: 170,
    borderRadius: 10,
    top: -40,
    left: -13,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },

  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  heartIcon: {padding: 10, top: 70},

  noFavorites: {
    fontSize: 18,
    color: COLORS.mediumGray,
    textAlign: 'center',
    marginTop: 20,
  },
});
