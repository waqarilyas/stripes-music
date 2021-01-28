import randomize from 'randomatic';
import React, { useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';

import { recentlyPlayedHome, musicIcon } from '../../../Assets/Icons';
import SectionHeader from '../SectionHeader';
import SongCardListView from '../SongCardListView';
import styles from './styles';
import EmptyCard from '../EmptyCard';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const emptyCard = () => {
  return (
    <EmptyCard text="No Recently Played Songs" icon={recentlyPlayedHome} />
  );
};

const HomeRecentPlayed = ({ navigation, playSong }) => {
  const { recentlyPlayed } = useSelector((state) => state.root.player);

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
            <TouchableOpacity onPress={() => playSong(item, recentlyPlayed)}>
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
