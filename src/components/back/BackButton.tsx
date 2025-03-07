import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const navigation = useNavigation();

const BackButton = () => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
      <Ionicons name="arrow-back" size={30} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  icon: {
    color: 'black',
  },
});

export default BackButton;
