/**
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
<<<<<<< HEAD
import { SafeAreaView, StatusBar } from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <></>
      </SafeAreaView>
    </>
=======
import { NavigationContainer } from '@react-navigation/native';

import SwitchNavigator from './src/navigation/switchNavigator/SwitchNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <SwitchNavigator />
    </NavigationContainer>
>>>>>>> master
  );
};

export default App;
