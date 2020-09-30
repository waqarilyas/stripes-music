import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

import styles from './styles';

const ArtistsImage = ({ imgUrl, firstName, lastName }) => {
  return (
    <View style={styles.container}>
      <Avatar rounded source={{ uri: imgUrl }} size="large" />
      <Text numberOfLines={1} style={styles.label}>
        {firstName} {lastName}
      </Text>

      {/* <Badge
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
      /> */}
    </View>
  );
};

export default ArtistsImage;
