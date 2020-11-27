
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import TrackPlayer from 'react-native-track-player';
import { Provider } from 'react-redux';
import { UserProvider } from './src/context/UserContext';
import reducer from './src/hooks/useReducer';
import AuthStack from './src/navigation/stacks/AuthenticationStack';
import MainAppStack from './src/navigation/stacks/MainAppStack';
import { store } from './src/Redux/store';

const initialState = { user: null };

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let [loading, setLoading] = useState(true);
  const onAuthStateChanged = (result) => {
    if (result) {
      dispatch({ user: result });
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } else {
      setLoading(false)
    }
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
          {loading ?
            <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} color="white" />
            </View>
            : state.user === null ? (
              <AuthStack />
            ) : (
                <UserProvider>
                  <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <MainAppStack />
                  </View>
                </UserProvider>
              )}
        </NavigationContainer>
      </Provider>
    </>
  );
};

// TrackPlayer.getInstance();
export default App;
