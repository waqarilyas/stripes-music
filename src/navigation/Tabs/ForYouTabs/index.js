import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ForYouSongs from '../../../screens/ForYouSongs';
import ForYouPlaylist from '../../../screens/ForYouPlaylist';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tabs = createMaterialTopTabNavigator();

function ForYouTabs() {
  return (
    <Tabs.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 14,
        },
        indicatorStyle: {
          backgroundColor: 'white',
          height: 1,
        },
        style: {
          backgroundColor: 'black',
          marginBottom: hp('2'),
        },
      }}>
      <Tabs.Screen name="Songs" component={ForYouSongs} />
      <Tabs.Screen name="Playlist" component={ForYouPlaylist} />
    </Tabs.Navigator>
  );
}

export default ForYouTabs;
