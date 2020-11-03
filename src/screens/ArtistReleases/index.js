import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-elements';

import ArtistPlaylistsCard from '../../components/ArtistPlaylistsCard';
import styles from './styles';

const ArtistReleases = ({ navigation }) => {
  const playlists = useSelector((state) => state.root.firebase.artistPlaylists);

  return (
    <View style={styles.container}>
      <FlatList
        data={playlists}
        style={styles.list}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item: { image, title, duration, author } }) => {
          return (
            <ArtistPlaylistsCard
              image={image}
              title={title}
              duration={duration}
              author={author}
            />
          );
        }}
      />
    </View>
  );
};

export default ArtistReleases;
