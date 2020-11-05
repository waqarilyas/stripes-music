import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountSetting from '../../screens/AccountSetting';
import ProfileScreen from '../../screens/ProfileScreen';
import ChangePassword from '../../screens/ChangePassword';
import NotificationSetting from '../../screens/NotificationSetting';
import SubscriptionStack from '../stacks/SubscriptionStack';
import TellAFriend from '../../screens/TellAFriend';
import EditProfile from '../../screens/EditProfile';

const Stack = createStackNavigator();

const AccountSettingStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
      />
      <Stack.Screen name="Subscriptions" component={SubscriptionStack} />
      <Stack.Screen name="TellAFriend" component={TellAFriend} />
    </Stack.Navigator>
  );
};

export default AccountSettingStack;
