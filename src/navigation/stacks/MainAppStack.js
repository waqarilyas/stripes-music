import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainTabs from '../tabs/MainTabs';
import AccountSettingStack from './AccountSettingStack';

const Stack = createStackNavigator();

const MainAppStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="AccountSettingStack"
        component={AccountSettingStack}
      />
    </Stack.Navigator>
  );
};

export default MainAppStack;
