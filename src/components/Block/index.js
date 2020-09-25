import React from 'react';
import { SafeAreaView, View } from 'react-native';

import styles from './styles';

const Block = ({ children }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>{children}</SafeAreaView>
    </View>
  );
};

export default Block;
