import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import styles from './styles';

const ArtistsHorizontalCard = ({ name, avatar }) => {
  return (
    <View style={styles.container}>
      <Image
        source={avatar ? { uri: avatar } : null}
        containerStyle={styles.image}
        PlaceholderContent={<ActivityIndicator />}
        placeholderStyle={styles.placeholder}
      />
      <Text numberOfLines={1} style={styles.label}>
        {name}
      </Text>
    </View>
  );
};

export default ArtistsHorizontalCard;
