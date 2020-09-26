/**
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import SwitchNavigator from './src/navigation/switchNavigator/SwitchNavigator';
import { UserProvider } from './src/context/UserContext';

const App = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <UserProvider>
        <NavigationContainer>
          <SwitchNavigator />
        </NavigationContainer>
      </UserProvider>
    </>
  );
};

export default App;
