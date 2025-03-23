import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
  },
  title: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  newText1: {
    fontFamily: 'FONTS.primary',
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.black,
  },
  newText3: {
    fontFamily: FONTS.primary,
    fontSize: 40,
    fontWeight: '800',
    left: -7,
    color: COLORS.black,
  },
  newText2: {
    fontFamily: FONTS.primary,
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.black,
  },
  petImage: {
    width: '100%',
    borderRadius: 30,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    left: 15,
    marginBottom: 10,
    gap: 40,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  selectedFilter: {
    backgroundColor: COLORS.black,
  },
  filterText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  selectedFilterText: {
    color: COLORS.white,
  },
  forYouSection: {
    marginTop: 30,
    marginBottom: 20,
  },

  search: {
    top: 100,
  },

  sectionTitle: {
    fontFamily: FONTS.primary,
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.black,
  },

  petDetails: {
    backgroundColor: COLORS.black,
    borderRadius: 30,

    flex: 1,
  },
  petprice: {
    fontFamily: FONTS.primary,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 5,
    left: 15,
    color: COLORS.white,
  },
  petName: {
    fontFamily: FONTS.primary,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 5,
    left: 15,
  },
  petInfo: {
    fontFamily: FONTS.primary,
    fontSize: 10,
    color: COLORS.white,
    marginBottom: 3,
    left: 15,
  },
  petType: {
    fontFamily: FONTS.primary,
    fontSize: 24,
    color: COLORS.white,
    fontWeight: '600',
    left: 15,
  },
});
