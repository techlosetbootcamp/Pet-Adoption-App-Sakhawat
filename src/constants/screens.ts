import Login from '../screens/auth/Login';
import RecoverPassword from '../screens/auth/RecoverPassword';
import SignUp from '../screens/auth/SignUp';
import PetDetails from '../screens/details/PetDetails';
import Donate from '../screens/donate/Donate';
import MyPetDetails from '../screens/details/MyPetDetails';

export const SCREENS = [
  {name: 'Login', component: Login},
  {name: 'SignUp', component: SignUp},
  {name: 'RecoverPassword', component: RecoverPassword},
  {name: 'Donate', component: Donate},
  {name: 'PetDetails', component: PetDetails},
  {name: 'MyPetDetails', component: MyPetDetails},
];
