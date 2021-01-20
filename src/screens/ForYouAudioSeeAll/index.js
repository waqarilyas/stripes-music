import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles';
import ForYouAudioCard from '../../components/ForYouAudioCard';
import {
  changeSong,
  pushToPlaylist,
  fullScreenChange,
} from '../../Redux/Reducers/audioSlice';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';
import { LOG } from '../../utils/Constants';
import TrackPlayer from 'react-native-track-player';

const ForYouAudioSeeAll = () => {
  const dispatch = useDispatch();
  const { allSongs } = useSelector((state) => state.root.firebase);

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
      <View>
        <Text style={styles.title}>Songs For You</Text>
        <Text style={styles.subtitle}>
          A collection of music recommended just for you. We hope you like it!
        </Text>
      </View>
      <FlatList
        data={allSongs}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item, item: { artwork, title, artist } }) => {
          return (
            <ForYouAudioCard
              artwork={artwork}
              title={title}
              artist={artist}
              onPress={() => playSong(item)}
            />
          );
        }}
      />
    </View>
  );
};

export default ForYouAudioSeeAll;
