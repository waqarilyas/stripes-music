import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
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
