import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';

import styles from './styles';

const ArtistsImage = () => {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        source={require('../../../Assets/Images/songCover4.jpg')}
        size="large"
      />

      <Badge
        status="error"
        containerStyle={{
          position: 'absolute',
          top: 0,
          right: 0,
          borderWidth: 0,
          elevation: 0,
        }}
        badgeStyle={{ backgroundColor: '#F5138E' }}
        value="9"
      />
    </View>
  );
};

export default ArtistsImage;
