import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // ✅ Correct Import
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // ✅ Import FontAwesome
import Favorites from '../screens/favorites/Favorites';
import Profile from '../screens/profile/Profile';
import Search from '../screens/search/Search';
import Home from '../screens/home/Home';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#aaa',
          tabBarLabelStyle: styles.tabLabel,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              return <FontAwesome name="home" size={size} color={color} />;
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
              return <Ionicons name="search" size={size} color={color} />;
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
              return <Ionicons name="heart" size={size} color={color} />;
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user-o';
              return <FontAwesome name="user" size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: '#000',
    borderTopWidth: 0,
    borderRadius: 70,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
