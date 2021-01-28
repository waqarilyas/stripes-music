import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { mostPlayedHome, whitePlayIcon } from '../../../Assets/Icons';
import EmptyCard from '../EmptyCard';
import SectionHeader from '../SectionHeader';
import SongCard from '../SongCard';

const emptyCard = () => {
  return <EmptyCard text="No Songs Played" icon={mostPlayedHome} />;
};

const HomeMostPlayed = ({ navigation, playSong }) => {
  const { mostPlayed } = useSelector((state) => state.root.firebase);

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
            <TouchableOpacity onPress={() => playSong(item, mostPlayed)}>
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
