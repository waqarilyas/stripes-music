import React, { useEffect } from 'react';

import useUser from '../../hooks/useUser';

const LoadingScreen = ({ navigation }) => {
  const currentUser = useUser();

  useEffect(() => {
    if (currentUser) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Auth');
    }
  }, [currentUser, navigation]);

  return <></>;
};

export default LoadingScreen;
