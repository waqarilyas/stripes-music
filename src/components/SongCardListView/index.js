import React, { useEffect, useState } from 'react';
import { ListItem, Image, Avatar } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import styles from './styles';

const SongCardListView = ({ title, artist, arts }) => {
  return (
    <ListItem bottomDivider containerStyle={styles.container}>
      <Avatar
        // title={}
        source={{ uri: arts[0] }}
        style={styles.cardImage}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{title}</ListItem.Title>
        <ListItem.Subtitle style={styles.subTitle}>{artist}</ListItem.Subtitle>
      </ListItem.Content>

      {/* <Text style={styles.subTitle}>3.45</Text> */}
    </ListItem>
  );
};

export default SongCardListView;
