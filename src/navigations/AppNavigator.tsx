import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import Login from '../screens/auth/Login';
import RecoverPassword from '../screens/auth/RecoverPassword'; 
import SignUp from '../screens/auth/SignUp'; 
import PetDetails from '../screens/details/PetDetails'; 
import MyPetDetails from '../screens/details/MyPetDetails';
import { useAppDispatch, useAppSelector } from '../hooks/useSelector';
import { fetchUserData } from '../redux/slices/authSlice';
import { RootStackParamList } from '../types/rootStackParamList';
import Donate from '../screens/donate/Donate';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(store => store.auth);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <NavigationContainer>
      {user? (
        <DrawerNavigator />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
          {/* Global screens accessible to all users */}
          <Stack.Screen name="Donate" component={Donate} />
          <Stack.Screen name="PetDetails" component={PetDetails} />
          <Stack.Screen name="MyPetDetails" component={MyPetDetails} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;