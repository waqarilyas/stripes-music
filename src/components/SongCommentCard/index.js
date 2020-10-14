import React from 'react';
import { View, Text } from 'react-native';
import { Rating, Image, Avatar } from 'react-native-elements';

import styles from './styles';

const SongCommentCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Review Title</Text>
          <Text style={styles.date}>05 November</Text>
        </View>
        <View style={styles.headerRight}>
          <Rating
            readonly
            imageSize={20}
            fractions={1}
            startingValue={3.3}
            style={styles.rating}
          />
          <Avatar
            rounded
            source={require('../../../Assets/Images/songCover5.jpg')}
          />
          <Text style={styles.author}>Author</Text>
        </View>
      </View>

      <Text style={styles.text} numberOfLines={4}>
        lorempixel lorempixel lorempixel lorempixel lorempixel lorempixel
        lorempixelLabels to show when each value is tapped e.g. If the first
        star is tapped, then value in index 0 will be used as the label
      </Text>
    </View>
  );
};

export default SongCommentCard;
