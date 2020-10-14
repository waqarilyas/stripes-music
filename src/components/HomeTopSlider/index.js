import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
// import { Image } from 'react-native-elements';

import styles from './styles.js';

const HomeTopSlider = ({ arts, title, description }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: arts[0] }} style={styles.image}>
        <View style={styles.text}>
          <Text style={styles.songName}>{title}</Text>
          <Text numberOfLines={1} style={styles.subText}>
            {description}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeTopSlider;
