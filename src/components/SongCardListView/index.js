import React from 'react';
import { Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

import styles from './styles';
import { heartIcon } from '../../../Assets/Icons';

const SongCardListView = () => {
  return (
    <ListItem bottomDivider containerStyle={styles.container}>
      <Avatar
        // title={}
        source={require('../../../Assets/Images/songCover7.jpg')}
        style={styles.cardImage}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>Blink of youth</ListItem.Title>
        <ListItem.Subtitle style={styles.subTitle}>
          Ringo Shinna
        </ListItem.Subtitle>
      </ListItem.Content>
      <Avatar source={heartIcon} style={styles.likeImage} />
      <Text style={styles.subTitle}>3.45</Text>
    </ListItem>
  );
};

export default SongCardListView;
