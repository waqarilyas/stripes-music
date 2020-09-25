import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../../screens/Home';

const stack = createStackNavigator();

const HomeStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Home" component={Home} />
    </stack.Navigator>
  );
};

export default HomeStack;
