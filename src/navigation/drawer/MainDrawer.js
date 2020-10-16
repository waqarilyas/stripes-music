import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabs from '../tabs/MainTabs';
import { tab1White, tab1Grey } from '../../../Assets/Icons';
import AccountSettingStack from '../stacks/AccountSettingStack';

const Drawer = createDrawerNavigator();

const MainDrawer = ({ navigation }) => {
  return (
    <>
      <Drawer.Navigator
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
        <Drawer.Screen
          name="AccountSettingStack"
          component={AccountSettingStack}
        />
      </Drawer.Navigator>
      <View style={{ backgroundColor: 'red' }}></View>
    </>
  );
};

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: 'black',
    width: 240,
  },
});

export default MainDrawer;
