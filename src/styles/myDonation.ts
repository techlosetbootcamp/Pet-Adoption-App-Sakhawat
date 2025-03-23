import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const myDonationStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  image: {
    width: 170,
    height: 170,
    borderRadius: 10,
    left: -10,
    bottom: 40,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    gap: 5,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 10,
    color: COLORS.mediumGray,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  noDonations: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.darkgray,
    marginTop: 20,
  },
  headerIcon: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  trashIcon: {top: 73, right: 10},
});
