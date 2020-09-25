/**
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import SwitchNavigator from './src/navigation/switchNavigator/SwitchNavigator';
import { UserProvider } from './src/context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <SwitchNavigator />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
