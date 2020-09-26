import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';

import styles from './styles';
import Block from '../../components/Block';
import SongCard from '../../components/SongCard';

const ForYouPlaylist = () => {
  const data = ['1', '2', '3', '4', '5', '6'];
  return (
    <Block>
      <View>
        <ScrollView horizontal>
          <FlatList
            contentContainerStyle={{
              alignSelf: 'flex-start',
            }}
            numColumns={Math.ceil(data.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={() => {
              return <SongCard />;
            }}
          />
        </ScrollView>
      </View>
    </Block>
  );
};

export default ForYouPlaylist;
