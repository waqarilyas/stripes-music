import React from 'react';
import { Text, View, Image } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import styles from './styles';
import { redLikeIcon } from '../../../Assets/Icons';

const ArtistSeeAllScreenCard = ({ imgUrl, firstName, lastName }) => {
  return (
    <View style={styles.container}>
      <ListItem containerStyle={{ backgroundColor: 'black' }}>
        <Avatar
          rounded
          size="medium"
          source={require('../../../Assets/Images/songCover5.jpg')}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>Artist Name</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            Followers
          </ListItem.Subtitle>
        </ListItem.Content>
        <Image source={redLikeIcon} style={styles.icon} />
      </ListItem>
    </View>
  );
};

export default ArtistSeeAllScreenCard;
