import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';

import styles from './styles';

const Block = ({ children }) => {
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>{children}</SafeAreaView>
      </View>
    </>
  );
};

export default Block;
