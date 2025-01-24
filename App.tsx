import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigations/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
      </GestureHandlerRootView>
    );
  }
}
