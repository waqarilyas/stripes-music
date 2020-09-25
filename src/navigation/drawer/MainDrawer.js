import * as React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Profile from '../../screens/Profile';
import MainTabs from '../tabs/MainTabs';
import { tab1White, tab1Grey } from '../../../Assets/Icons';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#c6cbef',
        width: 240,
      }}
      labeled={false}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home Screen') {
            iconName = focused ? tab1Grey : tab1White;
          }
          return <Image source={iconName} />;
        },
      })}>
      <Drawer.Screen name="Home Screen" component={MainTabs} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
