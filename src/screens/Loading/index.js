import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from './styles';
import useUser from '../../hooks/useUser';

const LoadingScreen = ({ navigation }) => {
  const user = useUser();

  useEffect(() => {
    if (user) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Auth');
    }
  }, [user, navigation]);

  return (
    <View style={styles.root}>
      <ActivityIndicator />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
