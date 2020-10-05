import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

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
            fontSize: RFValue(15),
          },
          indicatorStyle: {
            backgroundColor: 'white',
          },
          style: {
            backgroundColor: 'black',
          },
        }}>
        <MusicTabs.Screen name="News" component={ArtistNews} />
        <MusicTabs.Screen name="Popular" component={ArtistPopular} />
        <MusicTabs.Screen name="Releases" component={ArtistReleases} />
      </MusicTabs.Navigator>
    </View>
  );
};

export default ArtistsTabs;
