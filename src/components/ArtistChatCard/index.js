import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles';

const ArtistChatCard = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
};

export default ArtistChatCard;
