import React from 'react';
import { Text, View, ImageBackground, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles.js';

const HomeTopSlider = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}>
        <View style={styles.text}>
          <Text style={styles.songName}>{item.title}</Text>
          <Text numberOfLines={1} style={styles.subText}>
            {item.description}
          </Text>
        </View>
      </Image>
    </View>
  );
};

export default HomeTopSlider;
