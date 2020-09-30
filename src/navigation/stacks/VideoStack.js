import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Video from '../../screens/Video';
import NewVideos from '../../screens/NewVideos';
import VideoPopularNow from '../../screens/VideoPopularNow';
import TabsMainHeader from '../../components/TabsMainHeader';

const Stack = createStackNavigator();

const VideoStack = ({ navigation, route: { name } }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <TabsMainHeader navigation={navigation} name={name} />,
      }}>
      <Stack.Screen name="Videos" component={Video} />
      <Stack.Screen name="NewVideos" component={NewVideos} />
      <Stack.Screen name="VideoPopularNow" component={VideoPopularNow} />
    </Stack.Navigator>
  );
};

export default VideoStack;
