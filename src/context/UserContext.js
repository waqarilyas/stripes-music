import React, { createContext, useEffect, useReducer } from 'react';

import auth from '@react-native-firebase/auth';
import reducer from '../hooks/useReducer';

const initialState = { user: null };

const UserContext = createContext();

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onAuthStateChanged = (result) => {
    dispatch({ user: result });
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
