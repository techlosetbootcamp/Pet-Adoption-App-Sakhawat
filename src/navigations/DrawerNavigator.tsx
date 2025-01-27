import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList'; // Ensure this path is correct
import TabNavigator from './TabNavigator'; // Ensure this path is correct
import Adopt from '../screens/atopt/Adopt';
import Favorites from '../screens/favorites/Favorites';
import Profile from '../screens/profile/Profile';
import Donate from '../screens/donate/Donate';
import AddPet from '../screens/addpet/AddPet';
import Message from '../screens/message/Message';
import Search from '../screens/search/Search';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      Alert.alert(
        'Not Signed In',
        'No user is currently signed in.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return; // Exit the logout function if no user is signed in
    }

    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log out',
          onPress: () => {
            auth()
              .signOut()
              .then(() => {
                // Trigger the logout callback passed from AppNavigator
                onLogout();
                console.log('User logged out');
              })
              .catch((error) => {
                console.error('Logout Error:', error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

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
      <Drawer.Screen name="Search" component={Search} options={{ title: 'Search' }} />
      <Drawer.Screen name="Adopt" component={Adopt} options={{ title: 'Adopt' }} />
      <Drawer.Screen name="Donate" component={Donate} options={{ title: 'Donate' }} />
      <Drawer.Screen name="Add Pet" component={AddPet} options={{ title: 'Add Pet' }} />
      <Drawer.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
      <Drawer.Screen name="Message" component={Message} options={{ title: 'Message' }} />
      <Drawer.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />

      {/* Add a custom logout button */}
      <Drawer.Screen
        name="Logout"
        options={{ drawerLabel: () => null }} // Hide the default label, since we are handling it with a custom component
      >
        {() => (
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </Drawer.Screen>
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
