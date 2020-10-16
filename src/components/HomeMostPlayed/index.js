import React from 'react';
import { FlatList } from 'react-native';
import { mostPlayedHome, musicIcon } from '../../../Assets/Icons';
import EmptyCard from '../EmptyCard';
import SectionHeader from '../SectionHeader';
import SongCard from '../SongCard';

const emptyCard = () => {
  return <EmptyCard text="No Songs Played" icon={mostPlayedHome} />;
};

const HomeMostPlayed = ({ navigation, data }) => {
  return (
    <>
      <SectionHeader
        name="Most Played"
        icon={musicIcon}
        onPress={() => navigation.navigate('MostPlayedSeeAll')}
      />

      <FlatList
        data={data}
        horizontal
        contentContainerStyle={data.length > 0 ? null : { flex: 1 }}
        ListEmptyComponent={emptyCard}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { title, artist, artwork } }) => {
          return <SongCard title={title} artist={artist} artwork={artwork} />;
        }}
      />
    </>
  );
};

export default HomeMostPlayed;
