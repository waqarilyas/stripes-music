import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Video from '../../screens/Video';
import TabsMainHeader from '../../components/TabsMainHeader';

const Stack = createStackNavigator();

const VideoStack = ({ navigation, route: { name } }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <TabsMainHeader navigation={navigation} name={name} />,
      }}>
      <Stack.Screen name="Videos" component={Video} />
    </Stack.Navigator>
  );
};

export default VideoStack;
