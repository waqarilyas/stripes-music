import randomize from 'randomatic';
import React, { useEffect, useReducer } from 'react';
import { FlatList, ScrollView } from 'react-native';

import Block from '../../components/Block';
import SeeAll from '../../components/SeeAll';
import SongCard from '../../components/SongCard';
import reducer from '../../hooks/useReducer';
import { getCollection } from '../../utils/Firebase';
import styles from './styles';

const initialValues = {
  songs: [],
};

const ForYouSongs = ({ navigation }) => {
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
          ListHeaderComponent={<></>}
          contentContainerStyle={styles.contentContainerStyle}
          numColumns={Math.ceil(8 / 2)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={[...state.songs, { seeAll: true }]}
          renderItem={({ item: { title, arts, artist, seeAll } }) => {
            if (seeAll) {
              return (
                <SeeAll
                  onPress={() => navigation.navigate('ForYouAudioSeeAll')}
                />
              );
            } else {
              return (
                <SongCard
                  key={randomize('Aa0!', 10)}
                  title={title}
                  arts={arts}
                  artist={artist}
                />
              );
            }
          }}
          ListFooterComponent={<></>}
        />
      </ScrollView>
    </Block>
  );
};

export default ForYouSongs;
