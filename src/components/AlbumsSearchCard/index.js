import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles';
import { songCountIcon } from '../../../Assets/Icons';

const AlbumsSearchCard = ({ image, title, duration, author, songCount }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image}>
        <View style={styles.background}>
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </Image>
      <View style={styles.detail}>
        <View style={styles.containerLeft}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {author}
          </Text>
        </View>
        {/* <View style={styles.songCountContainer}>
          <Image source={songCountIcon} style={styles.countIcon} />
          <Text style={styles.viewButtonText}>{songCount}</Text>
        </View> */}
      </View>
    </View>
  );
};
export default AlbumsSearchCard;
