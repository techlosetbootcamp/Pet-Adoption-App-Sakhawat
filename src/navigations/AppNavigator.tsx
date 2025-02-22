import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator'; 
import Login from '../screens/auth/Login';
import RecoverPassword from '../screens/auth/RecoverPassword'; 
import SignUp from '../screens/auth/SignUp'; 
import PetDetails from '../screens/details/PetDetails'; 
import { useAppDispatch, useAppSelector } from '../hooks/useSelector';
import { fetchUserData } from '../redux/slices/authSlice';
import MyPetDetails from '../screens/details/MyPetDetails';
import { RootStackParamList } from '../types/rootStackParamList';



const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const {user} = useAppSelector(store => store.auth) 

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
