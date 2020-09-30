import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles.js';

const uri =
  'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/videos%2Fdrake-emotionless%2Fdrake-scorpion-video-art.jpg?alt=media&token=b49801ed-ef19-4b4b-9137-2f59257591e9';

const VideosSlider = ({ poster, title, artist }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: poster }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={1} style={styles.artist}>
        {artist}
      </Text>
    </View>
  );
};

export default VideosSlider;
