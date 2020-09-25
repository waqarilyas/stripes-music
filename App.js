/**
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import SwitchNavigator from './src/navigation/switchNavigator/SwitchNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <SwitchNavigator />
    </NavigationContainer>
  );
};

export default App;
