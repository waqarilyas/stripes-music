import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Playlist from '../../screens/Playlist';
import Artist from '../../screens/Artist';

const stack = createStackNavigator();

const PlaylistStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Playlist" component={Playlist} />
      <stack.Screen name="Artist" component={Artist} />
    </stack.Navigator>
  );
};

export default PlaylistStack;
