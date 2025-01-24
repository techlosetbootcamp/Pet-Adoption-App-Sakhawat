import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home'; // Ensure this is the correct path
import Search from '../screens/search/Search'; // Example Search Screen
import Favorites from '../screens/favorites/Favorites'; // Example Favorites Screen
import Profile from '../screens/profile/Profile'; // Example Profile Screen
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure Ionicons is installed

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, // Optionally hide the header for all screens
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = ''; // Initialize with an empty string

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'Favorites') {
          iconName = focused ? 'heart' : 'heart-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        // Ensure iconName is never undefined by providing a fallback
        return <Icon name={iconName || 'home'} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#aaa',
      tabBarActiveBackgroundColor: '#000',
      tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }, // Customize the label style
    })}
  >
    {/* All screens now have the bottom tab bar visible */}
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default TabNavigator;
