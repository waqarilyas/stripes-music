import React from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';

import styles from './styles';
import { userIcon } from '../../../Assets/Icons';

const BestPlaylistsCard = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../Assets/Images/songCover2.jpg')}
        style={styles.image}>
        <View style={styles.badge}>
          <Text style={styles.noSongs}>112 SONGS</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardTitle}>Pop Accoustic</Text>
      <View style={styles.bottom}>
        <Image source={userIcon} style={styles.bottomIcon} />
        <Text style={styles.text}>128,789</Text>
      </View>
    </View>
  );
};

export default BestPlaylistsCard;
