import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator'; // Ensure this path is correct
import Adopt from '../screens/atopt/Adopt';
import Favorites from '../screens/favorites/Favorites';
import Profile from '../screens/profile/Profile';
import Donate from '../screens/donate/Donate';
import AddPet from '../screens/addpet/AddPet';
import Message from '../screens/message/Message';
import Search from '../screens/search/Search';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Tabs">
    {/* Add label and icon for the Tabs screen */}
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
      options={{
        title: 'Search', // This will show as the label in the drawer
      }} />
    <Drawer.Screen 
      name="Adopt" 
      component={Adopt} 
      options={{
        title: 'Adopt', // This will show as the label in the drawer
      }} />
        <Drawer.Screen 
      name="Donate" 
      component={Donate} 
      options={{
        title: 'Donate', // This will show as the label in the drawer
      }} 
    />
    <Drawer.Screen 
      name="Add Pet" 
      component={AddPet} 
      options={{
        title: 'Add Pet', // This will show as the label in the drawer
      }} 
    />
      <Drawer.Screen 
      name="Favorites" 
      component={Favorites} 
      options={{
        title: 'Favorites', // This will show as the label in the drawer
      }} 
    />
    <Drawer.Screen 
      name="Message" 
      component={Message} 
      options={{
        title: 'Message', // This will show as the label in the drawer
      }} 
    />
     <Drawer.Screen 
      name="Profile" 
      component={Profile} 
      options={{
        title: 'Profile', // This will show as the label in the drawer
      }} 
    />
  
  </Drawer.Navigator>
);

export default DrawerNavigator;
