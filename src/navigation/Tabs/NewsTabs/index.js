import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import styles from './styles';
import NewsLatest from '../../../screens/NewsLatest';
import NewsTrending from '../../../screens/NewsTrending';

const Tabs = createMaterialTopTabNavigator();

function NewsTabs() {
  return (
    <Tabs.Navigator
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
      <Tabs.Screen name="NewsLatest" component={NewsLatest} />
      <Tabs.Screen name="NewsTrending" component={NewsTrending} />
    </Tabs.Navigator>
  );
}

export default NewsTabs;
