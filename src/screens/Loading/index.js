import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from './styles';

const LoadingScreen = () => {
  return (
    <View style={styles.root}>
      <ActivityIndicator />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
