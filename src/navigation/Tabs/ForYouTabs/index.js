import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ForYouSongs from '../../../screens/ForYouSongs';
import ForYouAlbums from '../../../screens/ForYouAlbums';
import styles from './styles';

const Tabs = createMaterialTopTabNavigator();

function ForYouTabs() {
  return (
    <Tabs.Navigator
      tabBarOptions={options}
      sceneContainerStyle={styles.sceneContainerStyle}>
      <Tabs.Screen name="Songs" component={ForYouSongs} />
      <Tabs.Screen name="Albums" component={ForYouAlbums} />
    </Tabs.Navigator>
  );
}

const options = {
  activeTintColor: 'white',
  inactiveTintColor: 'gray',
  labelStyle: {
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  indicatorStyle: {
    backgroundColor: 'white',
    opacity: 0.2,
    height: 2,
  },
  style: {
    backgroundColor: 'transparent',
    marginBottom: hp('2'),
    marginHorizontal: hp('1'),
  },
};

export default ForYouTabs;
