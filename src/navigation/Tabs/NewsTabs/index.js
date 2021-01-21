import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import NewsLatest from '../../../screens/NewsLatest';
import NewsTrending from '../../../screens/NewsTrending';

const Tabs = createMaterialTopTabNavigator();

function NewsTabs() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        indicatorStyle: {
          backgroundColor: 'transparent',
        },
        style: {
          backgroundColor: 'black',
          paddingTop: 12,
        },
      }}>
      <Tabs.Screen name="Latest" component={NewsLatest} />
      <Tabs.Screen name="Trending" component={NewsTrending} />
    </Tabs.Navigator>
  );
}

export default NewsTabs;
