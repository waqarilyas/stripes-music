import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SwitchNavigator from './src/navigation/switchNavigator/SwitchNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <SwitchNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
