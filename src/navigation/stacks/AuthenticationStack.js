import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../screens/Login';
import Signup from '../../screens/Signup';
import ForgotPassword from '../../screens/ForgotPassword';
import MainDrawer from '../../navigation/drawer/MainDrawer';
const stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
    <stack.Navigator headerMode="none">
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="Signup" component={Signup} />
      <stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <stack.Screen name="App" component={MainDrawer} />
    </stack.Navigator>
  );
};

export default AuthenticationStack;
