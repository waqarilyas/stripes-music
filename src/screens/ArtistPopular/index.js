import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import EmptyArtistProfileCard from '../../components/EmptyArtistProfileCard';

import { mostPlayedHome } from '../../../Assets/Icons';
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
        ListEmptyComponent={
          <EmptyArtistProfileCard
            text="NO POPULAR SONGS BY THIS ARTIST YET!"
            icon={mostPlayedHome}
            onPress={() => navigation.navigate('News')}
            buttonTitle=""
          />
        }
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ArtistPopular;
