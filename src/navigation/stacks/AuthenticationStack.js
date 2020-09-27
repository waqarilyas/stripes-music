import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../screens/Login';
import Signup from '../../screens/Signup';
import ForgotPassword from '../../screens/ForgotPassword';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
