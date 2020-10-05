import React from 'react';
import { View, Image } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import styles from './styles';
import { redLikeIcon } from '../../../Assets/Icons';
import { thousandSeprator } from '../../utils/Helpers';

const ArtistSeeAllScreenCard = ({ imgUrl, firstName, lastName, followers }) => {
  return (
    <View style={styles.container}>
      <ListItem containerStyle={styles.container}>
        <Avatar rounded size="medium" source={{ uri: imgUrl }} />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>
            {firstName} {lastName}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {thousandSeprator(followers)} followers
          </ListItem.Subtitle>
        </ListItem.Content>
        <Image source={redLikeIcon} style={styles.icon} />
      </ListItem>
    </View>
  );
};

export default ArtistSeeAllScreenCard;
