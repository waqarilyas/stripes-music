import React from 'react';
import { View, Text, FlatList } from 'react-native';

import styles from './styles';
import Block from '../../components/Block';
import RelatedNewsCard from '../../components/RelatedNewsCard';

const ArtistNews = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7'];
  return (
    <Block>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={() => {
          return <RelatedNewsCard />;
        }}
      />
    </Block>
  );
};

export default ArtistNews;
