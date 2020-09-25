import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Playlist from '../../screens/Playlist';

const stack = createStackNavigator();

const PlaylistStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Playlist" component={Playlist} />
    </stack.Navigator>
  );
};

export default PlaylistStack;
