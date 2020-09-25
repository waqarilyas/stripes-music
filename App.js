/**
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import Block from './src/components/Block';
import SwitchNavigator from './src/navigation/switchNavigator/SwitchNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        <SwitchNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
