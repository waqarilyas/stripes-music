import * as React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

//Local imports
import Profile from '../../screens/Profile';
import MainTabs from '../Tabs/MainTabs';
import VideoStack from '../stacks/VideoStack';
import PlaylistStack from '../stacks/PlaylistStack';
import NewsStack from '../stacks/NewsStack';
import CommunityStack from '../stacks/CommunityStack';
import {
  tab1White,
  tab1Grey,
  tab2White,
  tab2Grey,
  tab3White,
  tab3Grey,
  tab4White,
  tab4Grey,
  tab5White,
  tab5Grey,
} from '../../../Assets/Icons';

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
      screenOptions={({route}) => ({
        drawerIcon: ({focused, color, size}) => {
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
