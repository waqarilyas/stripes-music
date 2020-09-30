import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../screens/Home';
import TabsMainHeader from '../../components/TabsMainHeader';

const Stack = createStackNavigator();

const HomeStack = ({ navigation, route: { name } }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <TabsMainHeader navigation={navigation} name={name} />,
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
