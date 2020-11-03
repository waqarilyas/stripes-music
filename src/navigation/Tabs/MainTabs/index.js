import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

//local imports
import HomeStack from '../../stacks/HomeStack';
import VideoStack from '../../stacks/VideoStack';
import ProfileStack from '../../stacks/ProfileStack';
import NewsStack from '../../stacks/NewsStack';
import CommunityStack from '../../stacks/CommunityStack';
import {
  tab1Grey,
  tab2Grey,
  tab3Grey,
  tab4Grey,
  tab5Grey,
} from '../../../../Assets/Icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      activeColor="#FFFFFF"
      style={{ backgroundColor: 'black' }}
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
                width: hp('3'),
                height: hp('3'),
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
