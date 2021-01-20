import randomize from 'randomatic';
import React, { useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';

import { recentlyPlayedHome, musicIcon } from '../../../Assets/Icons';
import SectionHeader from '../SectionHeader';
import SongCardListView from '../SongCardListView';
import styles from './styles';
import EmptyCard from '../EmptyCard';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  changeSong,
  pushToPlaylist,
  fullScreenChange,
} from '../../Redux/Reducers/audioSlice';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';
import TrackPlayer from 'react-native-track-player';
import { LOG } from '../../utils/Constants';

const emptyCard = () => {
  return (
    <EmptyCard text="No Recently Played Songs" icon={recentlyPlayedHome} />
  );
};

const HomeRecentPlayed = ({ navigation }) => {
  const dispatch = useDispatch();
  const { recentlyPlayed } = useSelector((state) => state.root.player);

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
    <ScrollView>
      <FlatList
        ListHeaderComponent={
          <SectionHeader
            name="Recent Played"
            icon={musicIcon}
            onPress={() => navigation.navigate('RecentPlayedSeeAll')}
          />
        }
        data={recentlyPlayed}
        keyExtractor={() => randomize('Aa0!', 10)}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        ListEmptyComponent={emptyCard}
        renderItem={({ item, item: { title, artist, artwork, duration } }) => {
          return (
            <TouchableOpacity onPress={() => playSong(item)}>
              <SongCardListView
                title={title}
                artist={artist}
                artwork={artwork}
                duration={duration}
              />
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

// const sortRecentlyPlayed = (list) => {
//   let temp = list;
//   return temp.slice().sort((a, b) => {
//     return new Date(a.createdAt) - new Date(b.createdAt);
//   });
// };

export default HomeRecentPlayed;
