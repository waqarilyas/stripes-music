import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
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
    if (result) {
      store.dispatch(getUser());
      setLoading(false);
    } else {
<<<<<<< HEAD
      auth().signInAnonymously().then(res => {
        setLoading(false);
        store.dispatch(setUser({ isAnonymous: true }))
        dispatch({ user: { isAnonymous: true } });
      }).catch(err => {

        setLoading(false);
      });
=======
      auth()
        .signInAnonymously()
        .then(() => {
          setLoading(false);
          store.dispatch(setUser({ isAnonymous: true }));
        })
        .catch(() => {
          setLoading(false);
        });
>>>>>>> 533c9d1c267a98fbb3c4ba248fa63b770fb5e7c1
    }
  };

  const SetupAudioPlayer = async () => {
    TrackPlayer.updateOptions({
      jumpInterval: 15,
<<<<<<< HEAD
      stopWithApp: true,

      ...PLAYER_CONFIG,


      
=======
      stopWithApp: false,
      ...PLAYER_CONFIG,
>>>>>>> 533c9d1c267a98fbb3c4ba248fa63b770fb5e7c1
    });
  };

  const handleAppStateChange = (nextAppState) => {
<<<<<<< HEAD

    if (nextAppState === 'inactive' || nextAppState === 'background' || nextAppState != 'active') {
      if (store.getState().root?.firebase?.user?.isPaidUser) { } else {


        store.dispatch(changeToMiniModal(false))
        store.dispatch(fullScreenChange(false))
        TrackPlayer.destroy();
      }
=======
    if (
      nextAppState === 'inactive' ||
      nextAppState === 'background' ||
      nextAppState != 'active'
    ) {
      store.dispatch(changeToMiniModal(false));
      store.dispatch(fullScreenChange(false));
      TrackPlayer.destroy();
>>>>>>> 533c9d1c267a98fbb3c4ba248fa63b770fb5e7c1
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Provider store={store}>
        <NavigationContainer>
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
