import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import { useSelector } from 'react-redux';

import styles from './styles';
import ForYouAudioCard from '../../components/ForYouAudioCard';

const ForYouAudioSeeAll = () => {
  const { allSongs } = useSelector((state) => state.root.firebase);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Songs For You</Text>
        <Text style={styles.subtitle}>
          A collection of music recommended just for you. We hope you like it!
        </Text>
      </View>
      <FlatList
        data={allSongs}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item: { artwork, title, artist } }) => {
          return (
            <ForYouAudioCard artwork={artwork} title={title} artist={artist} />
          );
        }}
      />
    </View>
  );
};

export default ForYouAudioSeeAll;
