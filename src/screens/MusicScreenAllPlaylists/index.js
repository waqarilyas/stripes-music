import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import styles from './styles';
import ForYouPlaylistCard from '../../components/ForYouPlaylistCard';
import { useSelector } from 'react-redux';

const MusicScreenAllPlayLists = ({ navigation }) => {
  const { allBestPlaylists } = useSelector((state) => state.root.firebase);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Songs For You</Text>
        <Text style={styles.subtitle}>
          A collection of playlists recommended just for you. We hope you like
          it!
        </Text>
      </View>
      <FlatList
        data={allBestPlaylists}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item: { duration, title, author, image } }) => {
          return (
            <ForYouPlaylistCard
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

export default MusicScreenAllPlayLists;
