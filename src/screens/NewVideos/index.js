import React from 'react';
import { View, Text, FlatList } from 'react-native';

import styles from './styles';
import NewVideosCard from '../../components/NewVideosCard';
import Block from '../../components/Block';

const img =
  'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/artists%2Fkanye-west.jpg?alt=media&token=786c40c8-e4f1-4377-87b7-8cdc54cc2db1';

const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const NewVideos = () => {
  return (
    <Block>
      <Text style={styles.title}>New Videos</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={() => {
          return (
            <NewVideosCard
              poster={img}
              title="Title Here"
              artist="Author"
              viewCount={334168}
              likesCount={28742}
              duration="09:00"
            />
          );
        }}
      />
    </Block>
  );
};

export default NewVideos;
