import React from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

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
  const miniModalOpen = useSelector((state) => state.root.audio.miniModalOpen);
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={
        miniModalOpen
          ? {
              height: RFValue(80),
              marginTop: RFValue(80),
              backgroundColor: 'black',
            }
          : {
              height: RFValue(80),
              backgroundColor: 'black',
            }
      }
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? tab1White : tab1Grey;
          } else if (route.name === 'Videos') {
            iconName = focused ? tab2White : tab2Grey;
          } else if (route.name === 'Playlist') {
            iconName = focused ? tab3White : tab3Grey;
          } else if (route.name === 'Community') {
            iconName = focused ? tab4White : tab4Grey;
          } else if (route.name === 'News') {
            iconName = focused ? tab5White : tab5Grey;
          }

          return <Image source={iconName} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Videos" component={VideoStack} />
      <Tab.Screen name="Playlist" component={PlaylistStack} />
      <Tab.Screen name="Community" component={CommunityStack} />
      <Tab.Screen name="News" component={NewsStack} />
    </Tab.Navigator>
  );
};

export default MainTabs;
