
import React, { useState } from 'react';
import {  View, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Searchbar from '../components/search/Searchbar'; 
import Favorites from '../screens/favorites/Favorites';
import Profile from '../screens/profile/Profile';
import Donate from '../screens/donate/Donate';
import Request from '../screens/request/AdoptionRequest';
import UpdatePassword from '../screens/password/PasswordUpdate';
import Mydonation from '../screens/myDonation/Mydonation';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { setUser, signOutUser } from '../redux/slices/authSlice';
import { useAppDispatch } from '../hooks/useSelector';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/rootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
const Drawer = createDrawerNavigator();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handleLogout = async () => {
    try {
      await dispatch(signOutUser());
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };
  
  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => props.navigation.closeDrawer()} 
      >
        <Icon name="close" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <Searchbar onSearch={handleSearch}
        />
      </View>

      <DrawerItemList {...props} />

      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Log Out"
          onPress={handleLogout }
          labelStyle={styles.logoutLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Tabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} options={{ title: '', headerShadowVisible: false }}  />
      <Drawer.Screen name="Donate" component={Donate} options={{ title: 'Donate' }} />
      <Drawer.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
      <Drawer.Screen name="Request" component={Request} options={{ title: 'Adoption Request' }} />
      <Drawer.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      <Drawer.Screen name="Update Password" component={UpdatePassword} options={{ title: 'Update Password' }} />
      <Drawer.Screen name="My Donations" component={Mydonation} options={{ title: 'My Donations' }} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20, 
  },
  tabs:{},
  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 30,
    zIndex: 1,
  },
  searchContainer: {
    width: '100%',
    top: 160,
  },
  logoutContainer: {
    marginTop: 'auto',
    paddingBottom: 20, 
  },
  logoutLabel: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default DrawerNavigator;