import React from 'react';
import { Avatar, ListItem, Text } from 'react-native-elements';

import styles from './styles';

const SongCardListView = ({ title, artist, arts, duration }) => {
  return (
    <ListItem containerStyle={styles.container}>
      <Avatar
        // title={}
        source={{ uri: arts[0] }}
        style={styles.cardImage}
      />
      <ListItem.Content>
        <ListItem.Title numberOfLines={1} style={styles.title}>
          {title}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{artist}</ListItem.Subtitle>
      </ListItem.Content>

      <Text style={styles.duration}>{duration}</Text>
    </ListItem>
  );
};

export default SongCardListView;
