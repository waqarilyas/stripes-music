import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../screens/Home';
import TabsMainHeader from '../../components/TabsMainHeader';

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => <TabsMainHeader name="Home" navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
