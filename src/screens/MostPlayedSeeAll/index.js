import React, { useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import SongItem from '../../components/SongItem';
import { useSelector } from 'react-redux';

import styles from './styles';
import { getOrderedCollections } from '../../utils/Firebase';

const MostPlayedSeeAll = () => {
  const { mostPlayedSongs } = useSelector((state) => state.root.firebase);
  useEffect(() => {
    getOrderedCollections('songs', 'playCount', 'desc', (collection) =>
      dispatch({ songs: collection }),
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Most Played</Text>
        <Text style={styles.subtitle}>List of all Most Played Songs</Text>
      </View>
      <FlatList
        data={mostPlayedSongs}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <SongItem song={item} playlist={mostPlayedSongs} />;
        }}
      />
    </View>
  );
};

export default MostPlayedSeeAll;
