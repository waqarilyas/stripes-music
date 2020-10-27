import randomize from 'randomatic';
import React from 'react';
import { FlatList, Text, ScrollView, View } from 'react-native';
import { Divider } from 'react-native-elements';

import { recentlyPlayedHome, playIcon } from '../../../Assets/Icons';

import SectionHeader from '../SectionHeader';
import SongCardListView from '../SongCardListView';
import styles from './styles';
import EmptyCard from '../EmptyCard';
import { useSelector } from 'react-redux';

const emptyCard = () => {
  return (
    <EmptyCard text="No Recently Played Songs" icon={recentlyPlayedHome} />
  );
};

const HomeRecentPlayed = ({ navigation }) => {
  const { history } = useSelector((state) => state.root.firebase);

  return (
    <ScrollView>
      <FlatList
        ListHeaderComponent={
          <SectionHeader
            name="Recent Played"
            icon={playIcon}
            onPress={() => navigation.navigate('RecentPlayedSeeAll')}
          />
        }
        data={history}
        keyExtractor={() => randomize('Aa0!', 10)}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        ListEmptyComponent={emptyCard}
        renderItem={({ item: { id, title, artist, artwork, duration } }) => {
          return (
            <SongCardListView
              title={title}
              artist={artist}
              artwork={artwork}
              duration={duration}
              id={id}
            />
          );
        }}
      />
    </ScrollView>
  );
};

export default HomeRecentPlayed;
