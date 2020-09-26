import React from 'react';
import { Text, View, ImageBackground } from 'react-native';

import styles from './styles.js';

const HomeTopSlider = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../Assets/Images/songCover1.jpg')}
        style={styles.image}>
        <View style={styles.text}>
          <Text style={styles.songName}>Again</Text>
          <Text style={styles.subText}>Aimyon</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeTopSlider;
