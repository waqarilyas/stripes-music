import React from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//local imports
import HomeStack from '../../stacks/HomeStack';
import VideoStack from '../../stacks/VideoStack';
import PlaylistStack from '../../stacks/PlaylistStack';
import NewsStack from '../../stacks/NewsStack';
import CommunityStack from '../../stacks/CommunityStack';
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
} from '../../../../Assets/Icons';

const Tab = createMaterialBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={{ backgroundColor: 'black' }}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? tab1Grey : tab1White;
          } else if (route.name === 'Video') {
            iconName = focused ? tab2Grey : tab2White;
          } else if (route.name === 'Playlist') {
            iconName = focused ? tab3Grey : tab3White;
          } else if (route.name === 'Community') {
            iconName = focused ? tab4Grey : tab4White;
          } else if (route.name === 'News') {
            iconName = focused ? tab5Grey : tab5White;
          }

          return <Image source={iconName} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Video" component={VideoStack} />
      <Tab.Screen name="Playlist" component={PlaylistStack} />
      <Tab.Screen name="Community" component={CommunityStack} />
      <Tab.Screen name="News" component={NewsStack} />
    </Tab.Navigator>
  );
};

export default MainTabs;
