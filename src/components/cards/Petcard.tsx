import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

type PetCardProps = {
  children: ReactNode;
};

const PetCard: React.FC<PetCardProps> = ({ children }) => {
  return <View style={styles.petCard}>{children}</View>;
};

const styles = StyleSheet.create({
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    height: 150,
    marginTop: 40,
  },
});

export default PetCard;