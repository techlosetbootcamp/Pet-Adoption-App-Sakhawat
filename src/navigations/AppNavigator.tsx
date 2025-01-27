import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator'; // Ensure this path is correct
import Login from '../screens/auth/Login';
import Home from '../screens/home/Home'; // Ensure this path is correct
import RecoverPassword from '../screens/auth/RecoverPassword'; // Ensure this path is correct
import SignUp from '../screens/auth/SignUp'; // Ensure this path is correct
import PetDetails from '../screens/details/PetDetails'; // Import PetDetails here

export type RootStackParamList = {
  MainApp: undefined;
  Login: undefined;
  RecoverPassword: undefined;
  SignUp: undefined;
  Home: undefined;
  PetDetails: { petId: string }; // Define `petId` as a string for the PetDetails route
};

// Create the stack navigator with the type
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state here

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isLoggedIn ? 'MainApp' : 'Login'} // Choose initial route based on login state
      >
        {/* Login Screen */}
        <Stack.Screen name="Login" component={Login} />
        
        {/* Home Screen */}
        <Stack.Screen name="Home" component={Home} />

        {/* Drawer Navigator (Main App) */}
        <Stack.Screen name="MainApp">
          {props => <DrawerNavigator {...props} onLogout={() => setIsLoggedIn(false)} />}
        </Stack.Screen>

        {/* Recover Password Screen */}
        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPassword}
          options={{
            headerShown: true,
            title: '', // Empty title for a clean look
            headerShadowVisible: false, // Remove shadow
          }}
        />

        {/* Sign-Up Screen */}
        <Stack.Screen name="SignUp" component={SignUp} />
        
        {/* PetDetails Screen */}
        <Stack.Screen name="PetDetails" component={PetDetails} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
