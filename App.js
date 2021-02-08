import auth from '@react-native-firebase/auth';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import React, { useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, AppState, StatusBar, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import TrackPlayer from 'react-native-track-player';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

import { UserProvider } from './src/context/UserContext';
import MainAppStack from './src/navigation/stacks/MainAppStack';
import {
  changeToMiniModal,
  fullScreenChange,
} from './src/Redux/Reducers/audioSlice';
import { getUser, setUser } from './src/Redux/Reducers/firebaseSlice';
import { store } from './src/Redux/store';
import { PLAYER_CONFIG } from './src/utils/Constants';

const App = () => {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
    SetupAudioPlayer();
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      authSubscriber();
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const onAuthStateChanged = (result) => {
    // if (result) {
    store.dispatch(getUser());
    setLoading(false);
    // }
    // else {
    //   auth()
    //     .signInAnonymously()
    //     .then(() => {
    //       setLoading(false);
    //       store.dispatch(setUser({ isAnonymous: true }));
    //     })
    //     .catch(() => {
    //       setLoading(false);
    //     });
    // }
  };

  const SetupAudioPlayer = async () => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      jumpInterval: 15,
      stopWithApp: false,
      ...PLAYER_CONFIG,
    });
  };

  const handleAppStateChange = (nextAppState) => {
    if (
      nextAppState === 'inactive' ||
      nextAppState === 'background' ||
      nextAppState != 'active'
    ) {
      let user = store?.getState().root.firebase?.user;

      if (!user?.isPaidUser) {
        store.dispatch(changeToMiniModal(false));
        store.dispatch(fullScreenChange(false));
        TrackPlayer.destroy();
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Provider store={store}>
        <NavigationContainer theme={DarkTheme}>
          {loading ? (
            <View
              style={{
                flex: 1,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color="white" />
            </View>
          ) : (
            <UserProvider>
              <View style={{ flex: 1, backgroundColor: 'black' }}>
                <MainAppStack />
              </View>
            </UserProvider>
          )}
        </NavigationContainer>
      </Provider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
