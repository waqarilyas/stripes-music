import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../screens/Home';

const stack = createStackNavigator();

const HomeStack = () => {
  return (
    <stack.Navigator headerMode="none">
      <stack.Screen name="Home" component={Home} />
    </stack.Navigator>
  );
};

export default HomeStack;
