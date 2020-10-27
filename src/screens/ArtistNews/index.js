import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View } from 'react-native';

import RelatedNewsCard from '../../components/RelatedNewsCard';
import styles from './styles';
import { Divider } from 'react-native-elements';

const ArtistNews = () => {
  const artistNews = useSelector((state) => state.root.firebase.artistNews);

  return (
    <View style={styles.container}>
      <FlatList
        data={artistNews}
        style={styles.list}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item: { title, imgUrl, description } }) => {
          return (
            <RelatedNewsCard
              title={title || 'Title'}
              image={imgUrl || ''}
              description={description || 'Description'}
            />
          );
        }}
      />
    </View>
  );
};

export default ArtistNews;
