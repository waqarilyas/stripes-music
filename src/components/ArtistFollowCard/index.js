import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';

import styles from './styles';

const ArtistFollowCard = ({ text }) => {
  return (
    <View style={styles.container}>
      <ListItem
        containerStyle={{
          backgroundColor: 'black',
        }}>
        <Avatar
          rounded
          size="medium"
          source={require('../../../Assets/Images/songCover4.jpg')}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>Artist</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            99.99999999 Followers
          </ListItem.Subtitle>
        </ListItem.Content>
        <Button title="Follow" buttonStyle={styles.followButton} />
      </ListItem>
    </View>
  );
};

export default ArtistFollowCard;
