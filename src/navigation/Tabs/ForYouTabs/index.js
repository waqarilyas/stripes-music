import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ForYouSongs from '../../../screens/ForYouSongs';
import ForYouPlaylist from '../../../screens/ForYouPlaylist';
import styles from '../../../components/SongCard/styles';

const Tabs = createMaterialTopTabNavigator();

function ForYouTabs() {
  return (
    <Tabs.Navigator
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
      <Tabs.Screen name="Songs" component={ForYouSongs} />
      <Tabs.Screen name="Playlist" component={ForYouPlaylist} />
    </Tabs.Navigator>
  );
}

export default ForYouTabs;
