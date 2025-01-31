import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigations/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
