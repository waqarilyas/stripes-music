import React from 'react';
import { Image } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

import { convertToMinutes } from '../../utils/Helpers';
import styles from './styles';

const SongCardListView = ({ title, artist, artwork, duration }) => {
  return (
    <ListItem containerStyle={styles.container}>
      <Image source={{ uri: artwork }} style={styles.image} />
      <ListItem.Content>
        <ListItem.Title numberOfLines={1} style={styles.title}>
          {title}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{artist}</ListItem.Subtitle>
      </ListItem.Content>
      <Text style={styles.duration}>{convertToMinutes(duration)}</Text>
    </ListItem>
  );
};

export default SongCardListView;
