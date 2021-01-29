import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import styles from './styles';

const AlbumsSearchCard = ({ image, title, duration, author, songCount }) => {
  return (
    <View style={styles.container}>
      <Image source={image ? { uri: image } : null} style={styles.image}>
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
      </View>
    </View>
  );
};
export default AlbumsSearchCard;
