import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {fetchUserData} from '../redux/slices/authSlice';
import {RootStackParamList} from '../types/rootStackParamList';
import {SCREENS} from '../constants/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(store => store.auth);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <NavigationContainer>
      {user ? (
        <DrawerNavigator />
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {SCREENS.map(screen => (
            <Stack.Screen
              key={screen.name}
              name={screen.name as keyof RootStackParamList}
              component={screen.component}
            />
          ))}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
