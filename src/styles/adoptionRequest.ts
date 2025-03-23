import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const adoptionRequestStyles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white, padding: 20},
  header: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorText: {color: COLORS.red, fontSize: 16},

  row: {flexDirection: 'row', alignItems: 'flex-start'},
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.gray,
    borderRadius: 25,
    marginRight: 10,
    left: 7,
    top: 15,
  },
  name: {fontSize: 16, fontWeight: 'bold', left: 15},
  petInfo: {fontSize: 16, fontWeight: 'bold', top: 5, left: 15},
  email: {fontSize: 12, color: COLORS.gray, top: 5, left: 15},
  date: {fontSize: 12, color: COLORS.gray, top: 5, left: 15},

  cardContent: {
    flex: 1,
  },

  contactButton: {
    height: 35,
    width: '90%',
    borderRadius: 15,
    marginBottom: 10,
    left: 10,
  },

  contactText: {color: COLORS.white, fontSize: 16, fontWeight: 'bold'},
});
