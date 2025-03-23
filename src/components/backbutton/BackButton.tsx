import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BackButtonStyles} from '../../styles/backButton';

const navigation = useNavigation();

const BackButton = () => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={BackButtonStyles.button}>
      <Ionicons name="arrow-back" size={30} style={BackButtonStyles.icon} />
    </TouchableOpacity>
  );
};

export default BackButton;
