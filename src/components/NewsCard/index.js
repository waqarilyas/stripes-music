import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image, Text, Divider } from 'react-native-elements';

import styles from './styles';
import { likeIcon, commentIcon, shareIcon } from '../../../Assets/Icons';
import { thousandSeparator } from '../../utils/Helpers';

const NewsCard = ({
  title,
  image,
  date,
  description,
  likeCount,
  shareCount,
  commentCount,
  handleNav,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Image style={styles.image} source={image ? { uri: image } : null} />
        <View style={styles.textInner}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      <Text numberOfLines={4} style={styles.description}>
        {description}
      </Text>

      <Divider style={styles.divider} />
      <View style={styles.actions}>
        <View style={styles.icons}>
          <View style={styles.iconContainer}>
            <Image source={likeIcon} style={styles.icon} />
            <Text numberOfLines={1} style={styles.bottomSectionNumber}>
              {thousandSeparator(likeCount)}
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <Image source={commentIcon} style={styles.icon} />
            <Text numberOfLines={1} style={styles.bottomSectionNumber}>
              {thousandSeparator(commentCount)}
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <Image source={shareIcon} style={styles.icon} />
            <Text numberOfLines={1} style={styles.bottomSectionNumber}>
              {thousandSeparator(shareCount)}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleNav} style={styles.readButton}>
          <Text style={styles.readText}>Read</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsCard;
