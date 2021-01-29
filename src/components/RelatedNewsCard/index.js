import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

const RelatedNewsCard = ({ title, image, description }) => {
  return (
    <View style={styles.container}>
      <Image source={image ? { uri: image } : null} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={3}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default RelatedNewsCard;
