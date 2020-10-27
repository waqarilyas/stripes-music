import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles';

const ForYouAudioCard = ({ artwork, title, artist }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: artwork }} style={styles.image} />
      <View style={styles.detail}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {artist}
        </Text>
        <View style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Play</Text>
        </View>
      </View>
    </View>
  );
};

export default ForYouAudioCard;
