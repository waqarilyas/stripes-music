import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles.js';

const HomeTopSlider = ({ artwork, title, description }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: artwork }}
        style={styles.image}
        loadingIndicatorSource={<ActivityIndicator />}>
        <View style={styles.text}>
          <Text style={styles.songName}>{title}</Text>
          <Text numberOfLines={1} style={styles.subText}>
            {description}
          </Text>
        </View>
      </Image>
    </View>
  );
};

export default HomeTopSlider;
