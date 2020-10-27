import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import ArtistNews from '../../../screens/ArtistNews';
import ArtistPopular from '../../../screens/ArtistPopular';
import ArtistReleases from '../../../screens/ArtistReleases';

const Tab = createMaterialTopTabNavigator();

const ArtistsTabs = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
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
        <Tab.Screen name="News" component={ArtistNews} />
        <Tab.Screen name="Popular" component={ArtistPopular} />
        <Tab.Screen name="Releases" component={ArtistReleases} />
      </Tab.Navigator>
    </View>
  );
};

export default ArtistsTabs;
