import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles';
import { userIcon } from '../../../Assets/Icons';

const BestPlaylistsCard = ({
  imgUrl,
  songCount,
  title,
  viewCount,
  playlistType,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imgUrl }} style={styles.image}>
        <View style={styles.badge}>
          <Text style={styles.noSongs}>{songCount} SONGS</Text>
        </View>
      </Image>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.text}>{playlistType}</Text>
    </View>
  );
};

export default BestPlaylistsCard;
