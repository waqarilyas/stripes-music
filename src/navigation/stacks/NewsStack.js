import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import News from '../../screens/News';
import NewsDetails from '../../screens/NewsDetails';
import TabsMainHeader from '../../components/TabsMainHeader';

const Stack = createStackNavigator();

const NewsStack = ({ navigation, route: { name } }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="News"
        component={News}
        options={{
          header: () => <TabsMainHeader navigation={navigation} name={name} />,
        }}
      />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
    </Stack.Navigator>
  );
};

export default NewsStack;
