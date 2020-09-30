import React, { useEffect, useReducer } from 'react';
import { FlatList, View, ScrollView } from 'react-native';
import randomize from 'randomatic';

import styles from './styles';
import Block from '../../components/Block';
import SongCard from '../../components/SongCard';
import { getCollection } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';

const initialValues = {
  songs: [],
};

const ForYouSongs = () => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  useEffect(() => {
    getCollection('songs', 6, (collection) => {
      dispatch({ songs: collection });
    });
  }, []);

  return (
    <Block>
      <ScrollView horizontal>
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          numColumns={Math.ceil(10 / 4)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={state.songs}
          renderItem={({ item: { title, arts, artist } }) => {
            return (
              <SongCard
                key={randomize('Aa0!', 10)}
                title={title}
                arts={arts}
                artist={artist}
              />
            );
          }}
        />
      </ScrollView>
    </Block>
  );
};

export default ForYouSongs;
