import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EmptyArtistProfileCard from '../../components/EmptyArtistProfileCard';
import { mostPlayedHome } from '../../../Assets/Icons';
import SongItem from '../../components/SongItem';

const ArtistPopular = () => {
  const dispatch = useDispatch();
  const { artistPopularSongs } = useSelector((state) => state.root.firebase);

  return (
    <View style={styles.container}>
      {artistPopularSongs && (
        <FlatList
          data={artistPopularSongs}
          bounces={false}
          contentContainerStyle={
            artistPopularSongs.length > 0 ? null : { flex: 1 }
          }
          keyExtractor={(item) => `${item.id}`}
          ListEmptyComponent={
            <EmptyArtistProfileCard
              text="NO POPULAR SONGS BY THIS ARTIST YET!"
              icon={mostPlayedHome}
            />
          }
          renderItem={({ item }) => {
            return <SongItem song={item} playlist={artistPopularSongs} />;
          }}
        />
      )}
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
