import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainTabs from '../tabs/MainTabs';
import AccountSettingStack from './AccountSettingStack';
import MusicPlayerFullscreen from '../../screens/MusicPlayerFullScreen';
import MusicPlayerModal from '../../screens/MusicPlayerModal';
import { useSelector, useDispatch } from 'react-redux';
const Stack = createStackNavigator();

const MainAppStack = ({ navigation }) => {
  const currentState = useSelector((state) => state.root.audio.miniModalOpen);
  const isFullScreen = useSelector((state) => state.root.audio.isFullScreen);

  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="AccountSettingStack"
          component={AccountSettingStack}
        />
      </Stack.Navigator>
      {currentState ? <MusicPlayerModal /> : null}
      {isFullScreen ? <MusicPlayerFullscreen /> : null}
    </>
  );
};

export default MainAppStack;
