import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { thousandSeparator } from '../../utils/Helpers';

import styles from './styles';

const ArtistPlaylist = ({ image, title, duration, author, viewCount }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.image}></ImageBackground>
      <View style={styles.detail}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {author}
        </Text>
        <Text style={styles.duration}>{duration} Duration</Text>
        <Text style={styles.duration}>
          Viewed {thousandSeparator(viewCount)} times
        </Text>
        <Text style={styles.seeMore}>See More...</Text>
      </View>
    </View>
  );
};
export default ArtistPlaylist;
