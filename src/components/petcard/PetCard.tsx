import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {petCardStyles} from '../../styles/petCard';

type PetCardProps = {
  children: ReactNode;
};

const PetCard: React.FC<PetCardProps> = ({children}) => {
  return <View style={petCardStyles.petCard}>{children}</View>;
};

export default PetCard;
