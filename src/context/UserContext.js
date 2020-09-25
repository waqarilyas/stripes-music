import React, { useState, createContext, useEffect } from 'react';

import auth from '@react-native-firebase/auth';

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    }, []);
  });

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
