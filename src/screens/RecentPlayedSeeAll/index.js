import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles';
import SongCardListView from '../../components/SongCardListView';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeSong,
  setPlaylist,
  fullScreenChange,
} from '../../Redux/Reducers/audioSlice';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';
import TrackPlayer from 'react-native-track-player';
import { LOG } from '../../utils/Constants';

const RecentPlayedSeeAll = () => {
  const dispatch = useDispatch();
  const { allHistory } = useSelector((state) => state.root.firebase);

  const playSong = async (currentSong, playlist) => {
    const updatedPlaylist = playlist.filter(
      (song) => song.id !== currentSong.id,
    );
    try {
      dispatch(changeSong(currentSong));
      await TrackPlayer.add([currentSong, ...updatedPlaylist]);
      dispatch(fullScreenChange(true));
      dispatch(setPlaylist(playlist));
      dispatch(addPlayCount(currentSong.id));
      dispatch(addToRecentlyPlayed(currentSong));
    } catch (error) {
      LOG('PLAY SONG', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Recently Played</Text>
        <Text style={styles.subtitle}>
          Music recently played. History of your music is shown below
        </Text>
      </View>
      <FlatList
        data={allHistory}
        keyExtractor={(item) => item.id}
        renderItem={({
          item,
          item: { id, title, artist, artwork, duration },
        }) => {
          return (
            <TouchableOpacity onPress={() => playSong(item, allHistory)}>
              <SongCardListView
                title={title}
                artist={artist}
                artwork={artwork}
                duration={duration}
                id={id}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default RecentPlayedSeeAll;
