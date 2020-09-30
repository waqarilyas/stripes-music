import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import NewsTabs from '../../navigation/tabs/NewsTabs';

const News = () => {
  return (
    <View style={{ flex: 1 }}>
      <NewsTabs />
    </View>
  );
};

export default News;
