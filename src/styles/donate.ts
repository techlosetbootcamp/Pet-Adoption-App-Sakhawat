import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const donateStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    width: '100%',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  uploadPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  uploadText: {
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
  },
});
