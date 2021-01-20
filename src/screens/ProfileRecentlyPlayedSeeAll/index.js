import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import randomize from 'randomatic';
import { useSelector, useDispatch } from 'react-redux';

import SongCardListView from '../../components/SongCardListView';
import styles from './styles';
import {
  changeSong,
  pushToPlaylist,
  fullScreenChange,
} from '../../Redux/Reducers/audioSlice';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';
import TrackPlayer from 'react-native-track-player';
import { LOG } from '../../utils/Constants';

const ProfileRecentlyPlayedSeeAll = () => {
  const dispatch = useDispatch();
  const { allHistory } = useSelector((state) => state.root.firebase);

  const playSong = async ({ title, artist, artwork, url, duration, id }) => {
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
      <View style={styles.topView}>
        <Text style={styles.title}>Recently Played</Text>
        <Text style={styles.subtitle}>Songs Played Recently by you</Text>
      </View>

      <FlatList
        data={allHistory}
        keyExtractor={() => randomize('Aa0!', 10)}
        renderItem={({ item, item: { title, artist, arts, duration } }) => {
          return (
            <TouchableOpacity onPress={() => playSong(item)}>
              <SongCardListView
                title={title}
                artist={artist}
                arts={arts}
                duration={duration}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ProfileRecentlyPlayedSeeAll;
