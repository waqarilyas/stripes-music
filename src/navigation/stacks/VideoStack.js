import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Video from '../../screens/Video';
import NewVideos from '../../screens/NewVideos';
import VideoPopularNow from '../../screens/VideoPopularNow';

const stack = createStackNavigator();

const VideoStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Video" component={Video} />
      <stack.Screen name="NewVideos" component={NewVideos} />
      <stack.Screen name="VideoPopularNow" component={VideoPopularNow} />
    </stack.Navigator>
  );
};

export default VideoStack;
