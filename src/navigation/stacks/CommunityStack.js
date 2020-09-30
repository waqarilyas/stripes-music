import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Community from '../../screens/Community';
import NewMessage from '../../screens/NewMessage';
import MessageDetail from '../../screens/MessageDetail';

const stack = createStackNavigator();

const CommunityStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Community" component={Community} />
      <stack.Screen name="NewMessage" component={NewMessage} />
      <stack.Screen name="MessageDetail" component={MessageDetail} />
    </stack.Navigator>
  );
};

export default CommunityStack;
