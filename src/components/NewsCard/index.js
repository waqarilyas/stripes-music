import React from 'react';
import { View } from 'react-native';
import { Image, Text, Divider } from 'react-native-elements';

import styles from './styles';
import { likeIcon, commentIcon, shareIcon } from '../../../Assets/Icons';

const NewsCard = ({
  title,
  image,
  date,
  description,
  likeCount,
  shareCount,
  commentCount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Image style={styles.image} source={{ uri: image }} />
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
              {likeCount}
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <Image source={commentIcon} style={styles.icon} />
            <Text numberOfLines={1} style={styles.bottomSectionNumber}>
              {commentCount}
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <Image source={shareIcon} style={styles.icon} />
            <Text numberOfLines={1} style={styles.bottomSectionNumber}>
              {shareCount}
            </Text>
          </View>
        </View>
        <View style={styles.readButton}>
          <Text style={styles.readText}>Read</Text>
        </View>
      </View>
    </View>
  );
};

export default NewsCard;
