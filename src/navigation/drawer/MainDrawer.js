import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Profile from '../../screens/Profile';
import MainTabs from '../tabs/MainTabs';
import { tab1White, tab1Grey } from '../../../Assets/Icons';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: 'black',
        width: 240,
      }}
      drawerStyle={styles.drawerStyle}
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

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: '#c6cbef',
    width: 240,
  },
});

export default MainDrawer;
