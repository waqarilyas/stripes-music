import React from 'react';
import { View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Playlist from '../../screens/Playlist';
import Artist from '../../screens/Artist';
import { searchIcon, backIcon, menudots } from '../../../Assets/Icons';

const stack = createStackNavigator();

const PlaylistStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Playlist"
        component={Playlist}
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
