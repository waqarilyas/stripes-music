import React from 'react';
import { View, Text, FlatList } from 'react-native';

import styles from './styles';
import SongCardListView from '../../components/SongCardListView';
import { useSelector } from 'react-redux';

const RecentPlayedSeeAll = () => {
  const { allHistory } = useSelector((state) => state.root.firebase);

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
    </View>
  );
};

export default RecentPlayedSeeAll;
