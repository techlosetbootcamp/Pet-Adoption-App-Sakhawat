import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator'; // Ensure this path is correct
import Login from '../screens/auth/Login';
import Home from '../screens/home/Home'; // Ensure this path is correct
import RecoverPassword from '../screens/auth/RecoverPassword'; // Ensure this path is correct
import SignUp from '../screens/auth/SignUp'; // Ensure this path is correct
import PetDetails from '../screens/details/PetDetails'; // Import PetDetails here
import { useAppDispatch, useAppSelector } from '../hooks/useSelector';
import { fetchCurrentUser } from '../redux/slices/authSlice';
import MyPetDetails from '../screens/details/MyPetDetails';

export type RootStackParamList = {
  MainApp: undefined;
  Login: undefined;
  RecoverPassword: undefined;
  SignUp: undefined;
  Home: undefined;
  PetDetails: {petId: string};
  MyPetDetails: { petId: string };
  MyDonations: undefined;
};

// Create the stack navigator with the type
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const {user} = useAppSelector(store => store.auth) // Manage login state here

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user?.email ? (
          <>
            <Stack.Screen name="MainApp" component={DrawerNavigator} />
            <Stack.Screen name="PetDetails" component={PetDetails} />
            <Stack.Screen name="MyPetDetails" component={MyPetDetails} />

          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
