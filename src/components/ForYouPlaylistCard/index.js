import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ForYouPlaylistCard;
