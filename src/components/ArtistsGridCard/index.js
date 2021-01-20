import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles';
import { thousandSeparator } from '../../utils/Helpers';

const ArtistsGridCard = ({ name, avatar, followerCount }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatar }}
        containerStyle={styles.image}
        PlaceholderContent={<ActivityIndicator />}
        placeholderStyle={styles.placeholder}
      />
      <Text numberOfLines={1} style={styles.label}>
        {name}
      </Text>
      <Text numberOfLines={1} style={styles.count}>
        {thousandSeparator(followerCount)}
      </Text>
      <Text style={styles.subtitle}>FOLLOWERS</Text>
    </View>
  );
};

export default ArtistsGridCard;
