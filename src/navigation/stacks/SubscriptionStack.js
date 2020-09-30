import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Subscriptions from '../../screens/Subscriptions';
import YourSubscriptions from '../../screens/YourSubscriptions';
import EditYourSubscription from '../../screens/EditYourSubscription';
import ViewNewOffers from '../../screens/ViewNewOffers';

const stack = createStackNavigator();

const SubscriptionStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Subscriptions" component={Subscriptions} />
      <stack.Screen name="YourSubscriptions" component={YourSubscriptions} />
      <stack.Screen
        name="EditYourSubscription"
        component={EditYourSubscription}
      />
      <stack.Screen name="ViewNewOffers" component={ViewNewOffers} />
    </stack.Navigator>
  );
};

export default SubscriptionStack;
