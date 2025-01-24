import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Favorites from '../screens/favorites/Favorites';
import Profile from '../screens/profile/Profile';
import Search from '../screens/search/Search';
import Home from '../screens/home/Home';

const Tab = createBottomTabNavigator();

// Screen Components
const HomeScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Home Screen</Text>
  </View>
);

const SearchScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Search Screen</Text>
  </View>
);

const FavoritesScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Favorites Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Profile Screen</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName || 'default-icon'} size={24} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#aaa',
          tabBarActiveBackgroundColor: '#000',
          tabBarLabelStyle: styles.tabLabel,
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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tabBar: {
    height: 60,
    backgroundColor: '#000',
    borderTopWidth: 0,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
