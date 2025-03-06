// src/components/Header.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import useHeader from '../../hooks/useHeader';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../../types/rootStackParamList';

const Header = () => {
    const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
    const { photoURL } = useHeader();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>
      {photoURL ? (
        <Image source={{ uri: photoURL }} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 7,  
  },
  placeholderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
});

export default Header;
