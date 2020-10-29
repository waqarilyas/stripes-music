import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Subscriptions from '../../screens/Subscriptions';

import EditYourSubscription from '../../screens/EditYourSubscription';
import ViewNewOffers from '../../screens/ViewNewOffers';

const Stack = createStackNavigator();

const SubscriptionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Subscriptions" component={Subscriptions} />
      <Stack.Screen
        name="EditYourSubscription"
        component={EditYourSubscription}
      />
      <Stack.Screen name="ViewNewOffers" component={ViewNewOffers} />
    </Stack.Navigator>
  );
};

export default SubscriptionStack;
