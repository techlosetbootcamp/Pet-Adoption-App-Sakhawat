import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home'; 
import Search from '../screens/search/Search'; 
import Favorites from '../screens/favorites/Favorites'; 
import Profile from '../screens/profile/Profile'; 
import Icon from 'react-native-vector-icons/Ionicons'; 
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, 
      tabBarShowLabel: false,  

      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = ''; 

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'Favorites') {
          iconName = focused ? 'heart' : 'heart-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return (
          <View style={[styles.iconContainer, focused && styles.activeTab]}>
            <Icon name={iconName} size={30} color={color} />
          </View>
        );
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#aaa',
      tabBarStyle: styles.tabBar,
      tabBarButton: (props: any) => (
        <TouchableOpacity {...props} style={[styles.tabButton, props.accessibilityState?.selected && styles.selectedTab]} />
      ),
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    borderTopWidth: 0,
  },
  iconContainer: {
   
  },
  activeTab: {
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTab: {
    backgroundColor: '#222',
    borderRadius: 25,
  },
});

export default TabNavigator;
