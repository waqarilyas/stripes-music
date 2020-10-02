import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import {
  eyeIconWhite,
  newsComment,
  newLikeIconWhite,
} from '../../../Assets/Icons';

const NewsIconsCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={eyeIconWhite} style={styles.icon} />
        <Text style={styles.count}>788</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image source={newsComment} style={styles.icon} />
        <Text style={styles.count}>234</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image source={newLikeIconWhite} style={styles.icon} />
        <Text style={styles.count}>113</Text>
      </View>
    </View>
  );
};

export default NewsIconsCard;
