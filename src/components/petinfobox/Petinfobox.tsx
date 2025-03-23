import React from 'react';
import {View, Text} from 'react-native';
import {petInfoBoxStyles} from '../../styles/petInfoBox';

interface PetInfoBoxProps {
  label: string;
  value: string;
}

const PetInfoBox: React.FC<PetInfoBoxProps> = ({label, value}) => {
  return (
    <View style={petInfoBoxStyles.infoBox}>
      <Text style={petInfoBoxStyles.infoLabel}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

export default PetInfoBox;
