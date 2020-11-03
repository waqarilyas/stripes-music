import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import styles from './styles';
import { redLikeIcon } from '../../../Assets/Icons';

const ArtistSeeAllScreenCard = ({ avatar, name, onFavPress }) => {
  return (
    <View style={styles.container}>
      <ListItem containerStyle={styles.container}>
        <Avatar rounded size="medium" source={{ uri: avatar }} />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{name}</ListItem.Title>
        </ListItem.Content>
        <TouchableOpacity onPress={onFavPress}>
          <Image source={redLikeIcon} style={styles.icon} />
        </TouchableOpacity>
      </ListItem>
    </View>
  );
};

export default ArtistSeeAllScreenCard;
