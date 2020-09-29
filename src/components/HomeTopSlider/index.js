import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles.js';

const HomeTopSlider = ({ arts, title, description }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: arts[0] }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}>
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
