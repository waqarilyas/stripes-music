import React from 'react';
import { FlatList } from 'react-native';
import randomize from 'randomatic';

import SectionHeader from '../SectionHeader';
import { iconsPlaylist } from '../../../Assets/Icons';

import BestPlaylistsCard from '../BestPlaylistsCard';
import { useSelector } from 'react-redux';

const HomeBestPlaylists = ({ navigation }) => {
  const { bestPlaylists } = useSelector((state) => state.root.firebase);

  return (
    <>
      <SectionHeader
        name="Best Playlists"
        icon={iconsPlaylist}
        onPress={() => navigation.navigate('MusicScreenAllPlayLists')}
      />
      <FlatList
        data={bestPlaylists}
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
