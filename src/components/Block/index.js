import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
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
          keyboardShouldPersistTaps={'always'}
          nestedScrollEnabled>
          {children}
        </ScrollView>
      </View>
    </>
  );
};

export default Block;
