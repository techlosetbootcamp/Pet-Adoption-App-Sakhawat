import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import useHeader from '../../hooks/useHeader';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootStackParamList} from '../../types/rootStackParamList';
import {COLORS} from '../../constants/colors';
import {HeaderStyles} from '../../styles/header';

const Header = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const {photoURL} = useHeader();

  return (
    <View style={HeaderStyles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={30} color={COLORS.black} />
      </TouchableOpacity>
      {photoURL ? (
        <Image source={{uri: photoURL}} style={HeaderStyles.profileImage} />
      ) : (
        <View style={HeaderStyles.placeholderImage} />
      )}
    </View>
  );
};

export default Header;
