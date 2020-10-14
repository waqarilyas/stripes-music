import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

const ArtistsImage = ({ name, avatar }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.image} />
      <Text numberOfLines={1} style={styles.label}>
        {name}
      </Text>
    </View>
  );
};

export default ArtistsImage;
