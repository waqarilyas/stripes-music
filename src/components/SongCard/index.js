import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import styles from './styles';

const SongCard = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../Assets/Images/songCover3.jpg')}
        style={styles.image}></ImageBackground>
      <View style={styles.cardText}>
        <Text style={styles.cardHeader}>Feeling Happy</Text>
        <Text style={styles.cardSubHeader}>Artist</Text>
      </View>
    </View>
  );
};

export default SongCard;
