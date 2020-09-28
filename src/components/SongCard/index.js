import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles';

const SongCard = ({ title, artist, arts }) => {
  return (
    <View style={styles.container}>
      <Image
        source={arts && { uri: arts[0] }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator color="white" />}
      />
      <View style={styles.cardText}>
        <Text numberOfLines={1} style={styles.cardHeader}>
          {title}
        </Text>
        <Text style={styles.cardSubHeader}>{artist}</Text>
      </View>
    </View>
  );
};

export default SongCard;
