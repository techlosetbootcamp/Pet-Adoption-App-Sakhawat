import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from './RootStackParamList'; // Ensure this path is correct
import TabNavigator from './TabNavigator'; // Ensure this path is correct
import Adopt from '../screens/atopt/Adopt';
import Favorites from '../screens/favorites/Favorites';
import Profile from '../screens/profile/Profile';
import Donate from '../screens/donate/Donate';
import AddPet from '../screens/addpet/AddPet';
import Message from '../screens/message/Message';
import Search from '../screens/search/Search';
import UpdatePassword from '../screens/password/PasswordUpdate';

import logout from '../screens/auth/logout';
import Mydonation from '../screens/myDonation/Mydonation';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Drawer.Navigator initialRouteName="Tabs">
      <Drawer.Screen
        name="Tabs"
        component={TabNavigator}
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{title: 'Search'}}
      />
      <Drawer.Screen
        name="Adopt"
        component={Adopt}
        options={{title: 'Adopt'}}
      />
      <Drawer.Screen
        name="Donate"
        component={Donate}
        options={{title: 'Donate'}}
      />
      <Drawer.Screen
        name="Add Pet"
        component={AddPet}
        options={{title: 'Add Pet'}}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{title: 'Favorites'}}
      />
      <Drawer.Screen
        name="Message"
        component={Message}
        options={{title: 'Message'}}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />
  <Drawer.Screen
        name="Update Password"
        component={UpdatePassword}
        options={{title: 'Update Password'}}
      />
<Drawer.Screen
        name="My Donations"
        component={Mydonation}
        options={{title: 'My Donations'}}
      />

      <Drawer.Screen
        name="Logout"
        component={logout}
        options={{title: 'Logout'}}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#f44336', // Red color for logout
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default DrawerNavigator;
