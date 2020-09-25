import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Community from '../../screens/Community';

const stack = createStackNavigator();

const CommunityStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Community" component={Community} />
    </stack.Navigator>
  );
};

export default CommunityStack;
