import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles';

const PlaylistCard = ({ title, image }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator color="white" />}
      />
      <View style={styles.cardText}>
        <Text numberOfLines={1} style={styles.cardHeader}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default PlaylistCard;
