import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type CardProps = {
  children: ReactNode;
  onPress: () => void;
};

const Card: React.FC<CardProps> = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    top: 20,
    height: 130,
    width: '95%',
    marginBottom: 60,
  },
});

export default Card;
