import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../../screens/ProfileScreen';
import Artist from '../../screens/Artist';
import { searchIcon, backIcon } from '../../../Assets/Icons';

const stack = createStackNavigator();

const PlaylistStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Playlist"
        component={ProfileScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Image
              source={backIcon}
              style={{
                resizeMode: 'contain',
                height: 20,
                widthwidth: 20,
                marginLeft: 10,
              }}
            />
          ),
          headerRight: () => (
            <Image
              source={searchIcon}
              style={{
                resizeMode: 'contain',
                height: 20,
                widthwidth: 20,
              }}
            />
          ),
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
      />
      <stack.Screen name="Artist" component={Artist} />
    </stack.Navigator>
  );
};

export default PlaylistStack;
