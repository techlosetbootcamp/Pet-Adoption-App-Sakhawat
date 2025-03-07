import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps
} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Searchbar from '../components/searchbar/Searchbar';

import Donate from '../screens/donate/Donate';
import Request from '../screens/request/AdoptionRequest';
import UpdatePassword from '../screens/passwordUpdate/PasswordUpdate';
import Mydonation from '../screens/myDonation/Mydonation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOutUser } from '../redux/slices/authSlice';
import { useAppDispatch } from '../hooks/useSelector';
import PetDetails from '../screens/details/PetDetails';
import MyPetDetails from '../screens/details/MyPetDetails';

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
        <Searchbar onSearch={handleSearch} />
      </View>

      <DrawerItemList {...props} />

      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Log Out"
          onPress={handleLogout}
          labelStyle={styles.logoutLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { fontWeight: 'bold' }
      }}
      initialRouteName="Tabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} options={{ title: 'Home', headerShadowVisible: false }} />
      <Drawer.Screen name="Donate" component={Donate} options={{ title: 'Donate' }} />
      <Drawer.Screen name="Request" component={Request} options={{ title: 'Adoption Request' }} />
      <Drawer.Screen name="Update Password" component={UpdatePassword} options={{ title: 'Update Password' }} />
      <Drawer.Screen name="My Donations" component={Mydonation} options={{ title: 'My Donations' }} />

      <Drawer.Screen
        name="PetDetails"
        component={PetDetails}
        options={{
          title: '',
          drawerLabel: () => null, 
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => e.preventDefault(), 
        })}
      />
      <Drawer.Screen
        name="MyPetDetails"
        component={MyPetDetails}
        options={{
          title: '',
          drawerLabel: () => null,
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => e.preventDefault(),
        })}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 30,
    zIndex: 1,
  },
  searchContainer: {
    width: '100%',
    top: 160,
    marginBottom: 130,
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