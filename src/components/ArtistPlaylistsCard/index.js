import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles';

const ArtistPlaylist = ({ image, title, duration, author }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image}>
        <View style={styles.background}>
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </Image>
      <View style={styles.detail}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {author}
        </Text>
        <View style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Play</Text>
        </View>
      </View>
    </View>
  );
};
export default ArtistPlaylist;
