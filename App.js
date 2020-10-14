/**
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';

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

  useEffect(() => {
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
