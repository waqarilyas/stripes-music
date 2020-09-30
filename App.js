/**
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

import { UserProvider } from './src/context/UserContext';
import AuthStack from './src/navigation/stacks/AuthenticationStack';
import MainDrawer from './src/navigation/drawer/MainDrawer';
import reducer from './src/hooks/useReducer';
import randomize from 'randomatic';

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
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        {state.user === null ? (
          <AuthStack />
        ) : (
          <UserProvider>
            <MainDrawer />
          </UserProvider>
        )}
      </NavigationContainer>
    </>
  );
};

export default App;
