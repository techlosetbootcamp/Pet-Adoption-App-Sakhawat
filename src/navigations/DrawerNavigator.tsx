import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Donate from '../screens/donate/Donate';
import Request from '../screens/request/AdoptionRequest';
import UpdatePassword from '../screens/passwordUpdate/PasswordUpdate';
import Mydonation from '../screens/myDonation/Mydonation';
import PetDetails from '../screens/details/PetDetails';
import MyPetDetails from '../screens/details/MyPetDetails';
import CustomDrawer from '../components/drawer/Drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {fontWeight: 'bold'},
      }}
      initialRouteName="Tabs"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Tabs"
        component={TabNavigator}
        options={{title: 'Home', headerShadowVisible: false}}
      />
      <Drawer.Screen
        name="Donate"
        component={Donate}
        options={{title: 'Donate'}}
      />
      <Drawer.Screen
        name="Request"
        component={Request}
        options={{title: 'Adoption Request'}}
      />
      <Drawer.Screen
        name="Update Password"
        component={UpdatePassword}
        options={{title: 'Update Password'}}
      />
      <Drawer.Screen
        name="My Donations"
        component={Mydonation}
        options={{title: 'My Donations'}}
      />

      <Drawer.Screen
        name="PetDetails"
        component={PetDetails}
        options={{title: '', drawerLabel: () => null}}
        listeners={({navigation}) => ({
          drawerItemPress: e => e.preventDefault(),
        })}
      />
      <Drawer.Screen
        name="MyPetDetails"
        component={MyPetDetails}
        options={{title: '', drawerLabel: () => null}}
        listeners={({navigation}) => ({
          drawerItemPress: e => e.preventDefault(),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
