import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { LOG } from '../../utils/Constants';

import styles from './styles';

const ForYouAudioCard = ({ artwork, title, artist, onPress }) => {
  return (
    <View style={styles.container}>
      <Image source={artwork ? { uri: artwork } : null} style={styles.image} />
      <View style={styles.detail}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {artist}
        </Text>
        <TouchableOpacity style={styles.viewButton} onPress={onPress}>
          <Text style={styles.viewButtonText}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForYouAudioCard;
