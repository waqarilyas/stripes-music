import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import styles from './styles';
import NewsCard from '../../components/NewsCard';

const NewsLatest = ({ navigation }) => {
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
          // alignItems: 'center',
          // justifyContent: 'space-around',
        }}>
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </View>
    </ScrollView>
  );
};

export default NewsLatest;
