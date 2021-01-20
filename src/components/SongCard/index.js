import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles';

const SongCard = ({ title, artwork, artist }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: artwork }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator color="white" />}
        placeholderStyle={styles.placeholderStyle}
        transition={true}
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
