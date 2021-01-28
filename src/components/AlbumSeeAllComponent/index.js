import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

import styles from './styles';
import { eyeIcon, whitePlayIcon, musicIcon } from '../../../Assets/Icons';
import { thousandSeparator } from '../../utils/Helpers';

const AlbumSeeAllComponent = ({
  image,
  title,
  duration,
  author,
  viewCount,
  playCount,
  songCount,
}) => {
  console.log('Counts', viewCount, playCount, songCount);
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: image }} style={styles.image}>
        <View style={styles.background}>
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </ImageBackground>
      <View style={styles.detail}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {author}
        </Text>
        <View style={styles.iconWithLabel}>
          <Image source={eyeIcon} style={styles.icon} />
          <Text style={styles.label}>{thousandSeparator(viewCount)}</Text>
        </View>
        <View style={styles.iconWithLabel}>
          <Image source={whitePlayIcon} style={styles.icon} />
          <Text style={styles.label}>{thousandSeparator(playCount)}</Text>
        </View>
        <View style={styles.iconWithLabel}>
          <Image source={musicIcon} style={styles.icon} />
          <Text style={styles.label}>{thousandSeparator(songCount)}</Text>
        </View>
      </View>
    </View>
  );
};
export default AlbumSeeAllComponent;
