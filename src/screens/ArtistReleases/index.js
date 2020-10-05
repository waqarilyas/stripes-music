import React from 'react';
import { View, Text, FlatList } from 'react-native';

import styles from './styles';
import Block from '../../components/Block';
import SectionHeader from '../../components/SectionHeader';
import BestPlaylistsCard from '../../components/BestPlaylistsCard';
import SongCardListView from '../../components/SongCardListView';
import {
  artistIcon,
  iconsPlaylist,
  musicIcon,
  playIcon,
} from '../../../Assets/Icons';

const ArtistReleases = ({ navigation }) => {
  const data = ['1', '2', '3', '4', '5', '6', '7'];
  const img =
    'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/artists%2Fkanye-west.jpg?alt=media&token=786c40c8-e4f1-4377-87b7-8cdc54cc2db1';
  return (
    <Block>
      <SectionHeader
        name="The Best Playlists"
        icon={iconsPlaylist}
        onPress={() => navigation.navigate('MusicScreenAllPlayLists')}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        horizontal
        renderItem={() => {
          return (
            <BestPlaylistsCard
              imgUrl={img}
              songCount={1000}
              title="Title"
              viewCount={2000}
              playlistType="Public"
            />
          );
        }}
      />

      <FlatList
        ListHeaderComponent={<SectionHeader name="Title" icon={playIcon} />}
        data={data}
        keyExtractor={(item) => item}
        renderItem={() => {
          return <SongCardListView title="Title" artist="Artist" arts={data} />;
        }}
      />
    </Block>
  );
};

export default ArtistReleases;
