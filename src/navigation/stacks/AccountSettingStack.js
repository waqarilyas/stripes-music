import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountSetting from '../../screens/AccountSetting';
import Profile from '../../screens/Profile';
import ChangePassword from '../../screens/ChangePassword';
import NotificationSetting from '../../screens/NotificationSetting';
import SubscriptionStack from '../stacks/SubscriptionStack';
import TellAFriend from '../../screens/TellAFriend';

const stack = createStackNavigator();

const AccountSettingStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="AccountSetting" component={AccountSetting} />
      <stack.Screen name="Profile" component={Profile} />
      <stack.Screen name="ChangePassword" component={ChangePassword} />
      <stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
      />
      <stack.Screen name="Subscriptions" component={SubscriptionStack} />
      <stack.Screen name="TellAFriend" component={TellAFriend} />
    </stack.Navigator>
  );
};

export default AccountSettingStack;
