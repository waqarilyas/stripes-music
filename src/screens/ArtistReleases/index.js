import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-elements';
import EmptyArtistProfileCard from '../../components/EmptyArtistProfileCard';

import ArtistPlaylistsCard from '../../components/ArtistPlaylistsCard';
import { mostPlayedHome } from '../../../Assets/Icons';
import styles from './styles';

const ArtistReleases = ({ navigation }) => {
  const { artistPlaylists } = useSelector((state) => state.root.firebase);
  console.log(artistPlaylists);

  return (
    <View style={styles.container}>
      <FlatList
        data={artistPlaylists}
        style={styles.list}
        contentContainerStyle={
          artistPlaylists && artistPlaylists.length > 0 ? null : { flex: 1 }
        }
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        ListEmptyComponent={
          <EmptyArtistProfileCard
            text="NO RELEASES YET!"
            icon={mostPlayedHome}
          />
        }
        renderItem={({
          item: { image, title, duration, author, viewCount },
        }) => {
          return (
            <ArtistPlaylistsCard
              image={image}
              title={title}
              duration={duration}
              author={author}
              viewCount={viewCount}
            />
          );
        }}
      />
    </View>
  );
};

export default ArtistReleases;
