import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Search from '../screens/search/Search';
import Favorites from '../screens/favorites/Favorites';
import Profile from '../screens/profile/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/colors';
import {tabstyles} from '../styles/tabNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarShowLabel: false,

      tabBarIcon: ({focused, color}) => {
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
          <View
            style={[tabstyles.iconContainer, focused && tabstyles.activeTab]}>
            <Icon name={iconName} size={30} color={color} />
          </View>
        );
      },
      tabBarActiveTintColor: COLORS.white,
      tabBarInactiveTintColor: COLORS.white,
      tabBarStyle: tabstyles.tabBar,
      tabBarButton: (props: any) => (
        <TouchableOpacity
          {...props}
          style={[
            tabstyles.tabButton,
            props.accessibilityState?.selected && tabstyles.selectedTab,
          ]}
        />
      ),
    })}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default TabNavigator;
