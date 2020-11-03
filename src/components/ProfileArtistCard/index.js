import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

import styles from './styles';

const ProfileArtistCard = ({ name, image }) => {
  return (
    <View style={styles.container}>
      <Avatar rounded source={{ uri: image }} size="large" />
      <Text numberOfLines={1} style={styles.label}>
        {name}
      </Text>
    </View>
  );
};

export default ProfileArtistCard;
