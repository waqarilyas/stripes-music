import React, { createContext, useEffect, useReducer } from 'react';

import auth from '@react-native-firebase/auth';
import reducer from '../hooks/useReducer';
import { getDocument } from '../utils/Firebase';

const initialState = { user: null };

const UserContext = createContext();

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onAuthStateChanged = (result) => {
    if (result) {
      const userId = result.uid;
      getDocument('users', userId, (document) => {
        dispatch({ user: document });
      });
    }
  };

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return authSubscriber;
  }, []);

  return (
    <UserContext.Provider value={state.user}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
