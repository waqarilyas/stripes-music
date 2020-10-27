import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import styles from './styles';

import SeeAll from '../../components/SeeAll';
import PlaylistCard from '../../components/PlaylistCard';

const ForYouAlbums = ({ navigation }) => {
  const { albums } = useSelector((state) => state.root.firebase);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={Math.ceil(11 / 4)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[...albums, { seeAll: true }]}
        renderItem={({ item: { title, imgUrl, seeAll, songCount } }) => {
          if (seeAll) {
            return (
              <SeeAll
                onPress={() => navigation.navigate('ForYouAlbumsSeeAll')}
              />
            );
          } else {
            return (
              <PlaylistCard
                title={title}
                image={imgUrl}
                songsCount={songCount}
              />
            );
          }
        }}
      />
    </ScrollView>
  );
};

export default ForYouAlbums;
