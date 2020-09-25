import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Video from '../../screens/Video';

const stack = createStackNavigator();

const VideoStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Video" component={Video} />
    </stack.Navigator>
  );
};

export default VideoStack;
