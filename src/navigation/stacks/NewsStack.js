import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import News from '../../screens/News';
import NewsDetails from '../../screens/NewsDetails';

const stack = createStackNavigator();

const NewsStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="News" component={News} />
      <stack.Screen name="NewsDetails" component={NewsDetails} />
    </stack.Navigator>
  );
};

export default NewsStack;
