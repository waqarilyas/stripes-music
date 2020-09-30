import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from 'react-native';

import MusicPlayerReviews from '../../../screens/MusicPlayerReviews';
import MusicPlayerRelated from '../../../screens/MusicPlayerRelated';
import MusicPlayerListen from '../../../screens/MusicPlayerListen';
// import styles from '../../../components/SongCard/styles';

const MusicTabs = createMaterialTopTabNavigator();

const NowPlayingTabs = () => {
  return (
    <View style={{ flex: 1 }}>
      <MusicTabs.Navigator
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
        <MusicTabs.Screen name="Reviews">
          {(props) => <MusicPlayerReviews {...props} />}
        </MusicTabs.Screen>
        <MusicTabs.Screen
          name="Related"
          component={() => <MusicPlayerRelated />}
        />
        <MusicTabs.Screen
          name="Listen"
          component={() => <MusicPlayerListen />}
        />
      </MusicTabs.Navigator>
    </View>
  );
};

export default NowPlayingTabs;
