import React from 'react';
import { Text, FlatList, View, ScrollView } from 'react-native';

import styles from './styles';
import Block from '../../components/Block';
import SongCard from '../../components/SongCard';

const ForYouSongs = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  console.log(data.length);
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
            renderItem={({ item }) => {
              return <SongCard />;
            }}
          />
        </ScrollView>
      </View>
    </Block>
  );
};

export default ForYouSongs;
