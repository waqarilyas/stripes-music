import React from 'react';
import { Text, View, FlatList } from 'react-native';

import Block from '../../components/Block';
import SongCardListView from '../../components/SongCardListView';
import styles from './styles';

const MusicPlayerListen = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7'];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Related Songs</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={() => {
          return <SongCardListView arts={data} title="Title" artist="Artist" />;
        }}
      />
    </View>
  );
};

export default MusicPlayerListen;
