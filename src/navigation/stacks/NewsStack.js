import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import News from '../../screens/News';

const stack = createStackNavigator();

const NewsStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="News" component={News} />
    </stack.Navigator>
  );
};

export default NewsStack;
