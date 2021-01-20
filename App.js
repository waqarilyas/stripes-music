
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, AppState, StatusBar, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import TrackPlayer from 'react-native-track-player';
import { Provider } from 'react-redux';
import { UserProvider } from './src/context/UserContext';
import reducer from './src/hooks/useReducer';
import AuthStack from './src/navigation/stacks/AuthenticationStack';
import MainAppStack from './src/navigation/stacks/MainAppStack';
import { changeToMiniModal, fullScreenChange } from './src/Redux/Reducers/audioSlice';
import { setUser } from './src/Redux/Reducers/firebaseSlice';
import { store } from './src/Redux/store';
import { PLAYER_CONFIG } from './src/utils/Constants';

const initialState = { user: { isAnonymous: true } };

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let [loading, setLoading] = useState(true);
  const onAuthStateChanged = (result) => {
    if (result) {
      store.dispatch(setUser({ isAnonymous: result.isAnonymous }))
      dispatch({ user: result });
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } else {
      auth().signInAnonymously().then(res => {
        setLoading(false);
        store.dispatch(setUser({ isAnonymous: true }))
        dispatch({ user: { isAnonymous: true } });
      }).catch(err => {

        setLoading(false);
      });
    }
  };

  const SetupAudioPlayer = async () => {
    await TrackPlayer.updateOptions({
      jumpInterval: 15,
      stopWithApp: true,

      ...PLAYER_CONFIG,


      
    });
  };

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 2000);
    SetupAudioPlayer();
    const authSubsriber = auth().onAuthStateChanged(onAuthStateChanged);

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      authSubsriber();
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {

    if (nextAppState === 'inactive' || nextAppState === 'background' || nextAppState != 'active') {
      if (store.getState().root?.firebase?.user?.isPaidUser) { } else {


        store.dispatch(changeToMiniModal(false))
        store.dispatch(fullScreenChange(false))
        TrackPlayer.destroy();
      }
    }
  }
  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Provider store={store}>
        <NavigationContainer>
          {loading ?
            <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} color="white" />
            </View>
            :
            (
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
