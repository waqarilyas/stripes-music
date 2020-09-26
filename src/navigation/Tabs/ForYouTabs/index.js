import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ForYouSongs from '../../../screens/ForYouSongs';
import ForYouPlaylist from '../../../screens/ForYouPlaylist';
import styles from '../../../components/SongCard/styles';

const Tab = createMaterialTopTabNavigator();

function ForYouTabs() {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      style={styles.tabContainer}
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
      <Tab.Screen name="Songs" component={ForYouSongs} />
      <Tab.Screen name="Playlist" component={ForYouPlaylist} />
    </Tab.Navigator>
  );
}

export default ForYouTabs;
