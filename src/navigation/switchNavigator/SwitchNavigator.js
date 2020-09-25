import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainDrawer from '../drawer/MainDrawer';
import AuthenticationStack from '../stacks/AuthenticationStack';

const SwitchNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthenticationStack,
      App: MainDrawer,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

export default SwitchNavigator;
