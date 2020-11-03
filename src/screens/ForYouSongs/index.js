import randomize from 'randomatic';
import React from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import {
  changeSong,
  pushToPlaylist,
  fullScreenChange,
} from '../../Redux/Reducers/audioSlice';
import {
  addToRecentlyPlayed,
  addPlayCount,
} from '../../Redux/Reducers/firebaseSlice';

import SeeAll from '../../components/SeeAll';
import SongCard from '../../components/SongCard';

import styles from './styles';
import { LOG } from '../../utils/Constants';

const ForYouSongs = ({ navigation }) => {
  const dispatch = useDispatch();
  const { songs } = useSelector((state) => state.root.firebase);

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
    <ScrollView horizontal>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={Math.ceil(8 / 2)}
        showsHorizontalScrollIndicator={false}
        data={[...songs, { seeAll: true }]}
        renderItem={({ item, item: { title, artwork, artist, seeAll } }) => {
          if (seeAll) {
            return (
              <SeeAll
                onPress={() => navigation.navigate('ForYouAudioSeeAll')}
              />
            );
          } else {
            return (
              <TouchableOpacity onPress={() => playSong(item)}>
                <SongCard
                  key={randomize('Aa0!', 10)}
                  title={title}
                  artwork={artwork}
                  artist={artist}
                />
              </TouchableOpacity>
            );
          }
        }}
      />
    </ScrollView>
  );
};

export default ForYouSongs;
