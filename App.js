/**
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';
import TrackPlayer from 'react-native-track-player';
import SplashScreen from 'react-native-splash-screen';

import { UserProvider } from './src/context/UserContext';
import AuthStack from './src/navigation/stacks/AuthenticationStack';

import MainAppStack from './src/navigation/stacks/MainAppStack';
import reducer from './src/hooks/useReducer';

const initialState = { user: null };

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onAuthStateChanged = (result) => {
    dispatch({ user: result });
  };

  const SetupAudioPlayer = async () => {
    await TrackPlayer.updateOptions({
      jumpInterval: 15,
      stopWithApp: false,

      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      ],
      notificationCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      ],
    });
  };

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 2000);
    SetupAudioPlayer();
    const authSubsriber = auth().onAuthStateChanged(onAuthStateChanged);
    return authSubsriber;
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Provider store={store}>
        <NavigationContainer>
          {state.user === null ? (
            <AuthStack />
          ) : (
            <UserProvider>
              <MainAppStack />
            </UserProvider>
          )}
        </NavigationContainer>
      </Provider>
    </>
  );
};

// TrackPlayer.getInstance();
export default App;
