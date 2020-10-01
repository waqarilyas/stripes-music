import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import styles from './styles';
import NewsCard from '../../components/NewsCard';
import Block from '../../components/Block';

const NewsLatest = ({ navigation }) => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return (
    <Block>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={() => {
          return <NewsCard />;
        }}
      />
    </Block>
  );
};

export default NewsLatest;
