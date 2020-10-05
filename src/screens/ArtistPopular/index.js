import React from 'react';
import { View, Text, FlatList } from 'react-native';

import styles from './styles';
import SongItem from '../../components/SongItem';
import Block from '../../components/Block';

const ArtistPopular = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7'];
  return (
    <Block>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={() => {
          return <SongItem title="Title" author="Author" />;
        }}
      />
    </Block>
  );
};

export default ArtistPopular;
