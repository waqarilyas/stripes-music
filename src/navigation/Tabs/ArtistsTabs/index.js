import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from 'react-native';

import ArtistNews from '../../../screens/ArtistNews';
import ArtistPopular from '../../../screens/ArtistPopular';
import ArtistReleases from '../../../screens/ArtistReleases';

const MusicTabs = createMaterialTopTabNavigator();

const ArtistsTabs = () => {
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
          {(props) => <ArtistNews {...props} />}
        </MusicTabs.Screen>
        <MusicTabs.Screen name="Related" component={() => <ArtistPopular />} />
        <MusicTabs.Screen name="Listen" component={() => <ArtistReleases />} />
      </MusicTabs.Navigator>
    </View>
  );
};

export default ArtistsTabs;
