import React from 'react';
import { View, Text, Image } from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import {
  eyeIconWhite,
  shareIcon,
  newLikeIconWhite,
} from '../../../Assets/Icons';
import { thousandSeprator } from '../../utils/Helpers';

const check = (array = [], value = '') => {
  return array.includes(value);
};

const NewsIconsCard = ({ viewCount, likedBy, likeCount }) => {
  const uid = auth().currentUser.uid;
  const isLiked = check(likedBy, uid);
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={eyeIconWhite} style={styles.icon} />
        <Text style={styles.count}>{thousandSeprator(viewCount)}</Text>
      </View>

      <View style={styles.iconContainer}>
        <Image
          source={newLikeIconWhite}
          style={isLiked ? styles.activatedIcon : styles.icon}
        />
        <Text style={isLiked ? styles.activatedCount : styles.count}>
          {thousandSeprator(likeCount)}
        </Text>
      </View>

      <View style={styles.iconContainer}>
        <Image source={shareIcon} style={styles.icon} />
        <Text style={styles.count}>{thousandSeprator(likeCount)}</Text>
      </View>
    </View>
  );
};

export default NewsIconsCard;
