import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';

import styles from './styles';

const ArtistsImage = ({ imgUrl, firstName, lastName, followerCount }) => {
  return (
    <View style={styles.container}>
      <Avatar rounded source={{ uri: imgUrl }} size="large" />
      <Text numberOfLines={1} style={styles.label}>
        {firstName} {lastName}
      </Text>

      {followerCount !== 0 ? (
        followerCount >= 100 ? (
          <Badge
            status="error"
            containerStyle={styles.badgeContainer}
            textStyle={styles.badgeText}
            badgeStyle={styles.badgeStyle}
            value="99+"
          />
        ) : (
          <Badge
            status="error"
            containerStyle={styles.badgeContainer}
            textStyle={styles.badgeText}
            badgeStyle={styles.badgeStyle}
            value={followerCount}
          />
        )
      ) : null}
    </View>
  );
};

export default ArtistsImage;
