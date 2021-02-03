import randomize from 'randomatic';
import React from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import {
  changeSong,
  setPlaylist,
  fullScreenChange,
} from '../../Redux/Reducers/audioSlice';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';

import SeeAll from '../../components/SeeAll';
import SongCard from '../../components/SongCard';

import styles from './styles';
import { LOG } from '../../utils/Constants';

const ForYouSongs = ({ navigation }) => {
  const dispatch = useDispatch();
  const { songs } = useSelector((state) => state.root.firebase);

  const playSong = async (currentSong) => {
    const updatedPlaylist = songs.filter((song) => song.id !== currentSong.id);
    try {
      dispatch(changeSong(currentSong));
      await TrackPlayer.add([currentSong, ...updatedPlaylist]);
      dispatch(fullScreenChange(true));
      dispatch(setPlaylist(songs));
      dispatch(addPlayCount(currentSong.id));
      dispatch(addToRecentlyPlayed(currentSong));
    } catch (error) {
      LOG('PLAY SONG', error);
    }
  };

  const handleNav = () => navigation.navigate('ForYouAudioSeeAll');

  return (
    <ScrollView horizontal>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={Math.ceil(8 / 2)}
        showsHorizontalScrollIndicator={false}
        data={[...songs, { seeAll: true }]}
        renderItem={({ item, item: { title, artwork, artist, seeAll } }) => {
          if (seeAll) {
            return <SeeAll onPress={handleNav} />;
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
