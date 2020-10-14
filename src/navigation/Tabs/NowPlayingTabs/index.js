import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from 'react-native';

import MusicPlayerReviews from '../../../screens/MusicPlayerReviews';
import MusicPlayerRelated from '../../../screens/MusicPlayerRelated';
import MusicPlayerListen from '../../../screens/MusicPlayerListen';

const Tabs = createMaterialTopTabNavigator();

const NowPlayingTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Listen"
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#616161',
        labelStyle: {
          fontSize: 15,
        },
        indicatorStyle: {
          backgroundColor: 'white',
        },
        style: {
          backgroundColor: 'black',
        },
      }}>
      <Tabs.Screen name="Reviews" component={MusicPlayerReviews} />
      <Tabs.Screen name="Listen" component={MusicPlayerRelated} />
      <Tabs.Screen name="Related" component={MusicPlayerListen} />
    </Tabs.Navigator>
  );
};

export default NowPlayingTabs;
