import randomize from 'randomatic';
import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import SeeAll from '../../components/SeeAll';
import SongCard from '../../components/SongCard';

import styles from './styles';

const ForYouSongs = ({ navigation }) => {
  const { songs } = useSelector((state) => state.root.firebase);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={Math.ceil(8 / 2)}
        showsHorizontalScrollIndicator={false}
        data={[...songs, { seeAll: true }]}
        renderItem={({ item: { title, artwork, artist, seeAll } }) => {
          if (seeAll) {
            return (
              <SeeAll
                onPress={() => navigation.navigate('ForYouAudioSeeAll')}
              />
            );
          } else {
            return (
              <SongCard
                key={randomize('Aa0!', 10)}
                title={title}
                artwork={artwork}
                artist={artist}
              />
            );
          }
        }}
      />
    </ScrollView>
  );
};

export default ForYouSongs;
