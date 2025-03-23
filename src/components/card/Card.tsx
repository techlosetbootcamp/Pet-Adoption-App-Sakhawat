import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';
import {CardStyles} from '../../styles/card';

type CardProps = {
  children: ReactNode;
  onPress: () => void;
};

const Card: React.FC<CardProps> = ({children, onPress}) => {
  return (
    <TouchableOpacity style={CardStyles.card} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Card;
