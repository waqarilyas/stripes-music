import React, { useEffect, useReducer } from 'react';
import { View, FlatList, ScrollView } from 'react-native';

import styles from './styles';
import Block from '../../components/Block';
import SeeAll from '../../components/SeeAll';
import { getCollection } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import PlaylistCard from '../../components/PlaylistCard';
import randomize from 'randomatic';

const initialState = {
  playlists: [],
};

const ForYouPlaylist = ({ navigation }) => {
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
            ListHeaderComponent={<></>}
            contentContainerStyle={styles.contentContainerStyle}
            numColumns={Math.ceil(11 / 4)}
            keyExtractor={() => randomize('Aa!0', 10)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={[...state.playlists, { seeAll: true }]}
            renderItem={({ item: { title, image, seeAll, songs } }) => {
              if (seeAll) {
                return (
                  <SeeAll
                    onPress={() => navigation.navigate('ForYouPlaylistSeeAll')}
                  />
                );
              } else {
                return (
                  <PlaylistCard
                    title={title}
                    image={image}
                    songsCount={songs.length}
                  />
                );
              }
            }}
            ListFooterComponent={<></>}
          />
        </ScrollView>
      </View>
    </Block>
  );
};

export default ForYouPlaylist;
