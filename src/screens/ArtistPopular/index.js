import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import SongItem from '../../components/SongItem';

const ArtistPopular = () => {
  const popularSongs = useSelector(
    (state) => state.root.firebase.artistPopularSongs,
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={popularSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { title, artist, artwork, id, duration } }) => {
          return (
            <SongItem
              title={title}
              author={artist}
              image={artwork}
              id={id}
              duration={duration}
            />
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
});

export default ArtistPopular;
