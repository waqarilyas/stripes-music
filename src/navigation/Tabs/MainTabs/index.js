import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import {
  tab1Grey,
  tab2Grey,
  tab3Grey,
  tab4Grey,
  tab5Grey,
} from '../../../../Assets/Icons';
import CommunityStack from '../../stacks/CommunityStack';
//local imports
import HomeStack from '../../stacks/HomeStack';
import NewsStack from '../../stacks/NewsStack';
import ProfileStack from '../../stacks/ProfileStack';
import VideoStack from '../../stacks/VideoStack';

const Tab = createMaterialBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={{ backgroundColor: 'black' }}
      initialRouteName="Home"
      activeColor="#FFFFFF"
      inactiveColor="#616161"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = tab1Grey;
              break;
            case 'Videos':
              iconName = tab2Grey;
              break;
            case 'Profile':
              iconName = tab3Grey;
              break;
            case 'Community':
              iconName = tab4Grey;
              break;
            case 'News':
              iconName = tab5Grey;
              break;
          }

          return (
            <Image
              source={iconName}
              style={{
                tintColor: color,
                width: heightPercentageToDP('3'),
                height: heightPercentageToDP('3'),
              }}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Videos" component={VideoStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Community" component={CommunityStack} />
      <Tab.Screen name="News" component={NewsStack} />
    </Tab.Navigator>
  );
};

export default MainTabs;
