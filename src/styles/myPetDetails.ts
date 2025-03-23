import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const myPetDetailsStyles = StyleSheet.create({
  container: {flexGrow: 1, backgroundColor: COLORS.lightGray},
  petCard: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    height: 450,
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  petName: {fontSize: 28, fontWeight: 'bold', top: 30},
  price: {
    fontSize: 30,
    color: COLORS.orange,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginLeft: 'auto',
  },
  type: {fontSize: 15, color: COLORS.mediumGray, top: -15},
  infoContainer: {flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15},

  ownerInfo: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  ownerName: {fontSize: 16, top: -10, fontWeight: 'bold'},
  ownerRole: {fontSize: 14, color: COLORS.lightGray, left: 55, top: -30},
  description: {fontSize: 18, color: COLORS.gray, marginBottom: 20},
  ownerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  location: {
    top: 220,
    alignSelf: 'flex-end',
    textAlign: 'right',
    right: 20,
    position: 'absolute',
    fontSize: 15,
  },
  deleteIcon: {position: 'absolute', top: 20, right: 20, zIndex: 1},
});
