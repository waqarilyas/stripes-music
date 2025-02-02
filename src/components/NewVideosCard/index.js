import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Image } from 'react-native-elements';

import { eyeIcon } from '../../../Assets/Icons';
import styles from './styles';
import { thousandSeparator } from '../../utils/Helpers';

const NewVideoscard = ({ poster, title, artist, viewCount, duration }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: poster }} style={styles.video}>
        <View style={styles.background}>
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </ImageBackground>
      <View style={styles.detail}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          {artist}
        </Text>

        <View style={styles.views}>
          <Image source={eyeIcon} style={styles.icon} />
          <Text numberOfLines={1} style={styles.viewCount}>
            {thousandSeparator(viewCount)}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default NewVideoscard;
