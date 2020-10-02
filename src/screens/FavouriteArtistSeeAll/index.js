import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import styles from './styles';
import ArtistSeeAllScreenCard from '../../components/ArtistSeeAllScreenCard';
import Block from '../../components/Block';

const FavouriteArtistSeeAll = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  return (
    <Block>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={() => {
          return <ArtistSeeAllScreenCard />;
        }}
      />
    </Block>
  );
};

export default FavouriteArtistSeeAll;
