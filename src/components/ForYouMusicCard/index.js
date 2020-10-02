import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';

import { heartGrayIcon, eyeIcon } from '../../../Assets/Icons';
import styles from './styles';

const ForYouMusicCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../Assets/Images/songCover1.jpg')}
        style={styles.image}>
        <View style={styles.background}>
          <Text style={styles.duration}>9H</Text>
        </View>
      </Image>
      <View style={styles.detail}>
        <Text style={styles.title}>Happy Accident Feel The Real Pain</Text>
        <Text style={styles.subtitle}>Beatrice</Text>
        <View style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Play</Text>
        </View>
      </View>
    </View>
  );
};
export default ForYouMusicCard;
