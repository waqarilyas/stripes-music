import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';

import { heartGrayIcon, eyeIcon } from '../../../Assets/Icons';
import styles from './styles';

const NewVideoscard = ({
  poster,
  title,
  artist,
  viewCount,
  likesCount,
  duration,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: poster }} style={styles.video}>
        <View style={styles.background}>
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </Image>
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
            {viewCount}
          </Text>
        </View>
        {/* <View style={styles.likes}>
          <Image source={heartGrayIcon} style={styles.icon} />
          <Text numberOfLines={1} style={styles.viewCount}>
            {likesCount}
          </Text>
        </View> */}
      </View>
    </View>
  );
};
export default NewVideoscard;
