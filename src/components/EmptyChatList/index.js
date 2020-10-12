import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import { emptyChatIcon } from '../../../Assets/Icons';

const EmptyChatList = () => {
  return (
    <View style={styles.container}>
      <Image source={emptyChatIcon} style={styles.icon} />
      <Text style={styles.text}>Start a chat with an Artist</Text>
    </View>
  );
};

export default EmptyChatList;
