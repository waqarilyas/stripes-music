import React, { useEffect, useReducer } from 'react';
import { FlatList } from 'react-native';
import randomize from 'randomatic';

import SectionHeader from '../SectionHeader';
import { iconsPlaylist } from '../../../Assets/Icons';
import { getOrderedCollection } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import BestPlaylistsCard from '../BestPlaylistsCard';

const initialState = {
  playlists: [],
};

const HomeBestPlaylists = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Get Playlists
    getOrderedCollection('playlists', 'viewCount', 'desc', 8, (collection) =>
      dispatch({ playlists: collection }),
    );
  }, []);

  return (
    <>
      <SectionHeader
        name="Best Playlists"
        icon={iconsPlaylist}
        onPress={() => navigation.navigate('MusicScreenAllPlayLists')}
      />
      <FlatList
        data={state.playlists}
        keyExtractor={() => randomize('Aa!0', 10)}
        horizontal
        renderItem={({ item: { image, songs, title, viewCount } }) => {
          return (
            <BestPlaylistsCard
              imgUrl={image}
              songCount={songs.length}
              title={title}
              viewCount={viewCount}
            />
          );
        }}
      />
    </>
  );
};

export default HomeBestPlaylists;
