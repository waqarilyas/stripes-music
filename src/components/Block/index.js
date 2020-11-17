import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import styles from './styles';

const Block = ({ children }) => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'black' }} />
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicato={false}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled>
          {children}
        </ScrollView>
      </View>
    </>
  );
};

export default Block;
