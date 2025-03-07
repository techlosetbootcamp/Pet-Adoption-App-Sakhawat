import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PetInfoBoxProps {
  label: string;
  value: string;
}

const PetInfoBox: React.FC<PetInfoBoxProps> = ({ label, value }) => {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#ff9800',
  },
  infoBox: {
    backgroundColor: '#fdebd0',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    flex: 1,
    alignItems: 'center',
  },
});

export default PetInfoBox;
