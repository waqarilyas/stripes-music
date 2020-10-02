import React from 'react';
import { View, Text, Image } from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements';

import styles from './styles';
import {
  newsComment,
  newsLike,
  newsShare,
  sendIcon,
} from '../../../Assets/Icons';

const NewsCommentCard = ({ title, image }) => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  return (
    <View style={styles.container}>
      <ListItem>
        <Avatar
          rounded
          source={require('../../../Assets/Images/songCover4.jpg')}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>
            A Long Title Goes Here,Another songs from this singer. I am enjoying
            it and you should too!
          </ListItem.Title>
          <View style={styles.cardBottom}>
            <Text style={styles.subtitle}>Amelia</Text>
            <Text style={styles.subtitle}>1 month ago</Text>
          </View>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default NewsCommentCard;
