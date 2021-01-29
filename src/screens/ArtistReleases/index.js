import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import EmptyArtistProfileCard from '../../components/EmptyArtistProfileCard';
import { changeSong, fullScreenChange } from '../../Redux/Reducers/audioSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';
import ArtistPlaylistsCard from '../../components/ArtistPlaylistsCard';
import { mostPlayedHome } from '../../../Assets/Icons';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

import styles from './styles';

const ArtistReleases = ({ navigation }) => {
  const { artistPlaylists, allSongs } = useSelector(
    (state) => state.root.firebase,
  );
  const dispatch = useDispatch();

  const getPlaylistSongs = (index) => {
    const playlistSongs = [];
    const songs = [];
    artistPlaylists[index].songs.forEach((songId) => {
      allSongs.forEach((song) => {
        if (song.id === songId) {
          songs.push(song);
        }
      });
    });
    return [...songs];
  };

  const playSong = async (index) => {
    const playlist = getPlaylistSongs(index);
    try {
      dispatch(changeSong(playlist[0]));
      dispatch(fullScreenChange(true));
      await TrackPlayer.add(playlist);
      dispatch(addPlayCount(playlist[0].id));
      dispatch(addToRecentlyPlayed(playlist[0]));
    } catch (error) {
      console.log('PLAY SONG', error);
    }
  };

  console.log('artistPlaylist', artistPlaylists);

  return (
    <View style={styles.container}>
      <FlatList
        data={artistPlaylists}
        style={styles.list}
        contentContainerStyle={
          artistPlaylists && artistPlaylists.length > 0 ? null : { flex: 1 }
        }
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        ListEmptyComponent={
          <EmptyArtistProfileCard
            text="NO RELEASES YET!"
            icon={mostPlayedHome}
          />
        }
        renderItem={({
          item,
          index,
          item: { image, title, duration, author, viewCount },
        }) => {
          return (
            <TouchableOpacity onPress={() => playSong(index)}>
              <ArtistPlaylistsCard
                image={image}
                title={title}
                duration={duration}
                author={author}
                viewCount={viewCount}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ArtistReleases;
