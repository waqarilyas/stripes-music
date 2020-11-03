import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import SongCard from '../SongCard';
import EmptyCard from '../EmptyCard';
import SectionHeader from '../SectionHeader';
import { mostPlayedHome, whitePlayIcon } from '../../../Assets/Icons';
import {
  changeSong,
  pushToPlaylist,
  fullScreenChange,
} from '../../Redux/Reducers/audioSlice';
import {
  addToRecentlyPlayed,
  addPlayCount,
} from '../../Redux/Reducers/firebaseSlice';
import { LOG } from '../../utils/Constants';

const emptyCard = () => {
  return <EmptyCard text="No Songs Played" icon={mostPlayedHome} />;
};

const HomeMostPlayed = ({ navigation }) => {
  const dispatch = useDispatch();
  const { mostPlayed } = useSelector((state) => state.root.firebase);

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
    <>
      <SectionHeader
        name="Most Played"
        icon={whitePlayIcon}
        onPress={() => navigation.navigate('MostPlayedSeeAll')}
      />

      <FlatList
        data={mostPlayed}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={mostPlayed.length > 0 ? null : styles.container}
        ListEmptyComponent={emptyCard}
        keyExtractor={(item) => item.id}
        renderItem={({ item, item: { title, artist, artwork } }) => {
          return (
            <TouchableOpacity onPress={() => playSong(item)}>
              <SongCard title={title} artist={artist} artwork={artwork} />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeMostPlayed;
