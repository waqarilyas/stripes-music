import React, { useEffect, useReducer } from 'react';
import { View, FlatList, ScrollView } from 'react-native';

import styles from './styles';
import Block from '../../components/Block';
import SongCard from '../../components/SongCard';
import { getCollection } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import PlaylistCard from '../../components/PlaylistCard';
import randomize from 'randomatic';

const initialState = {
  playlists: [],
};

const ForYouPlaylist = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCollection('playlists', 6, (collection) => {
      dispatch({ playlists: collection });
    });
  }, []);

  return (
    <Block>
      <View>
        <ScrollView horizontal>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            numColumns={Math.ceil(11 / 4)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={state.playlists}
            renderItem={({ item: { title, image } }) => {
              return (
                <PlaylistCard
                  key={randomize('Aa0!', 10)}
                  title={title}
                  image={image}
                />
              );
            }}
          />
        </ScrollView>
      </View>
    </Block>
  );
};

export default ForYouPlaylist;
