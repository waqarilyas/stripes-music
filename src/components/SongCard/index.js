import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles';

const SongCard = ({ title, artist, arts }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: arts[0] }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator color="white" />}
      />
      <View style={styles.cardText}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
    </View>
  );
};

export default SongCard;
