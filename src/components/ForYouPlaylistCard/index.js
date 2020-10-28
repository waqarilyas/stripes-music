import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import styles from './styles';

const ForYouPlaylistCard = ({ image, title, duration, author }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: image }} style={styles.image}>
        <View style={styles.background}>
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </ImageBackground>
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
export default ForYouPlaylistCard;
