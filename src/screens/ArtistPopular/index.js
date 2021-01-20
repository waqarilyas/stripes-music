import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EmptyArtistProfileCard from '../../components/EmptyArtistProfileCard';
import TrackPlayer from 'react-native-track-player';

import {
  changeSong,
  fullScreenChange,
  pushToPlaylist,
} from '../../Redux/Reducers/audioSlice';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import { mostPlayedHome } from '../../../Assets/Icons';
import SongItem from '../../components/SongItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';

const ArtistPopular = () => {
  const dispatch = useDispatch();
  const { artistPopularSongs } = useSelector((state) => state.root.firebase);

  const handleSong = async ({ title, artist, artwork, url, duration, id }) => {
    try {
      const result = {
        title,
        artist,
        artwork,
        url,
        duration,
        id,
        createdAt: +new Date(),
      };
      dispatch(changeSong(result));
      dispatch(pushToPlaylist(result));
      await TrackPlayer.add(result);
      dispatch(fullScreenChange(true));
      dispatch(addPlayCount(id));
      dispatch(addToRecentlyPlayed(result));
    } catch (error) {
      LOG('PLAY SONG', error);
    }
  };

  return (
    <View style={styles.container}>
      {artistPopularSongs && (
        <FlatList
          data={artistPopularSongs}
          contentContainerStyle={
            artistPopularSongs.length > 0 ? null : { flex: 1 }
          }
          keyExtractor={(item) => `${item.id}`}
          ListEmptyComponent={
            <EmptyArtistProfileCard
              text="NO POPULAR SONGS BY THIS ARTIST YET!"
              icon={mostPlayedHome}
            />
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => handleSong(item)}>
                <SongItem
                  title={item.title}
                  author={item.artist}
                  image={item.artwork}
                  id={item.id}
                  duration={item.duration}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ArtistPopular;
