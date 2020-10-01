import React from 'react';
import { View } from 'react-native';

import NewsTabs from '../../navigation/tabs/NewsTabs';
import styles from './styles';

const News = () => {
  return (
    <View style={styles.container}>
      <NewsTabs />
    </View>
  );
};

export default News;
