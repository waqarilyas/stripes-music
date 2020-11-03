import React from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';

import styles from './styles';
import { eyeIcon } from '../../../Assets/Icons';
import { thousandSeprator } from '../../utils/Helpers';

const BestPlaylistsCard = ({ imgUrl, songCount, title, viewCount }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: imgUrl }} style={styles.image}>
        <View style={styles.badge}>
          <Text style={styles.noSongs}>{songCount} SONGS</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.bottom}>
        <Image source={eyeIcon} style={styles.icon} />
        <Text style={styles.text}>{thousandSeprator(viewCount)}</Text>
      </View>
    </View>
  );
};

export default BestPlaylistsCard;
