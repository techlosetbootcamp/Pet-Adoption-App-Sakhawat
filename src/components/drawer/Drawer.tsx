import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {signOutUser} from '../../redux/slices/authSlice';
import {useAppDispatch} from '../../redux/store';
import Searchbar from '../searchbar/Searchbar';
import {COLORS} from '../../constants/colors';
import {DrawerStyles} from '../../styles/drawer';

const Drawer: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(signOutUser());
    } catch (error) {}
  };

  return (
    <DrawerContentScrollView contentContainerStyle={DrawerStyles.drawerContent}>
      <TouchableOpacity
        style={DrawerStyles.closeIcon}
        onPress={() => props.navigation.closeDrawer()}>
        <Icon name="close" size={30} color={COLORS.black} />
      </TouchableOpacity>

      <View style={DrawerStyles.searchContainer}>
        <Searchbar />
      </View>

      <DrawerItemList {...props} />

      <View style={DrawerStyles.logoutContainer}>
        <DrawerItem
          label="Log Out"
          onPress={handleLogout}
          labelStyle={DrawerStyles.logoutLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default Drawer;
