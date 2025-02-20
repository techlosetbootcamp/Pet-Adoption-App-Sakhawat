// import React, { useState } from 'react';
// import { Alert, View, StyleSheet } from 'react-native';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
// import { RootStackParamList } from './RootStackParamList';
// import TabNavigator from './TabNavigator';
// import Searchbar from '../components/search/Searchbar'; // ✅ Ensure correct import path
// import Favorites from '../screens/favorites/Favorites';
// import Profile from '../screens/profile/Profile';
// import Donate from '../screens/donate/Donate';
// import Request from '../screens/request/AdoptionRequest';
// import UpdatePassword from '../screens/password/PasswordUpdate';
// import Mydonation from '../screens/myDonation/Mydonation';
// import auth from '@react-native-firebase/auth';
// import { useDispatch } from 'react-redux';
// import { logout } from '../redux/slices/authSlice';

// const Drawer = createDrawerNavigator();

// const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     console.log('Search Query:', query); // ✅ Implement search logic if needed
//   };

//   const handleLogout = async () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to log out?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Logout', 
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await auth().signOut();
//               dispatch(logout()); 
//             } catch (error) {
//               console.error('Logout Error:', error);
//             }
//           } 
//         },
//       ]
//     );
//   };

//   return (
//     <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
//       {/* ✅ Searchbar at the top */}
//       <View style={styles.searchContainer}>
//         <Searchbar onSearch={handleSearch} />
//       </View>

//       <DrawerItemList {...props} />
//       <View style={styles.logoutContainer}>
//         <DrawerItem 
//           label="Logout" 
//           onPress={handleLogout} 
//           labelStyle={styles.logoutLabel} 
//         />
//       </View>
//     </DrawerContentScrollView>
//   );
// };

// const DrawerNavigator: React.FC = () => {
//   return (
//     <Drawer.Navigator 
//       screenOptions={{ headerShown: false }} 
//       initialRouteName="Tabs" 
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen name="Tabs" component={TabNavigator} options={{ title: '', headerShadowVisible: false }} />
//       <Drawer.Screen name="Donate" component={Donate} options={{ title: 'Donate' }} />
//       <Drawer.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
//       <Drawer.Screen name="Request" component={Request} options={{ title: 'Adoption Request' }} />
//       <Drawer.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
//       <Drawer.Screen name="Update Password" component={UpdatePassword} options={{ title: 'Update Password' }} />
//       <Drawer.Screen name="My Donations" component={Mydonation} options={{ title: 'My Donations' }} />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   searchContainer: {
//   },
//   logoutContainer: {
//     marginTop: 'auto', // ✅ Pushes logout button to the bottom
//   },
//   logoutLabel: {
//     color: 'red', // ✅ Red color for logout text
//     fontWeight: 'bold',
//   },
// });

// export default DrawerNavigator;

import React, { useState } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Searchbar from '../components/search/Searchbar'; // Ensure correct import path
import Favorites from '../screens/favorites/Favorites';
import Profile from '../screens/profile/Profile';
import Donate from '../screens/donate/Donate';
import Request from '../screens/request/AdoptionRequest';
import UpdatePassword from '../screens/password/PasswordUpdate';
import Mydonation from '../screens/myDonation/Mydonation';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon library
import { signOutUser } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';
import { useAppDispatch } from '../hooks/useSelector';

const Drawer = createDrawerNavigator();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search Query:', query);
  };
  const handleLogout = async () => {
  
    try {
      await dispatch(signOutUser()); // ✅ Correct typing
      console.log("Successfully logged out!");
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };
  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
      {/* Cross icon to close the drawer */}
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => props.navigation.closeDrawer()} // Close the drawer
      >
        <Icon name="close" size={30} color="#000" />
      </TouchableOpacity>

      {/* Searchbar always visible */}
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
    paddingTop: 20, // Add padding to ensure content is not hidden behind the status bar
  },
  tabs:{},
  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 30,
    zIndex: 1, // Ensure the icon is above other elements
  },
  searchContainer: {
    width: '100%',
    top: 150, // Ensures full width
  },
  logoutContainer: {
    marginTop: 'auto',
    paddingBottom: 20, // Add padding to ensure the logout button is not hidden
  },
  logoutLabel: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default DrawerNavigator;