import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles.js';

const VideosSlider = ({ poster, title, artist }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: poster }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={1} style={styles.artist}>
        {artist}
      </Text>
    </TouchableOpacity>
  );
};

export default VideosSlider;
