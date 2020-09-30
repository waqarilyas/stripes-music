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

const NewsCard = ({ title, image }) => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  return (
    <View style={styles.container}>
      <ListItem containerStyle={{ backgroundColor: 'black' }}>
        <Avatar
          source={require('../../../Assets/Images/songCover4.jpg')}
          style={styles.image}
        />
        <ListItem.Content>
          <ListItem.Title
            style={styles.title}
            containerStyle={{ backgroundColor: 'red' }}>
            A Long Title Goes Here
          </ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            12 November, 2017
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      <Text style={styles.text}>
        ListItems are used to display rows of information, such as a contact
        list, playlist, or menu. They are very customizeable and can contain
        switches, avatars, badges, icons, and more.
      </Text>

      <Divider style={styles.divider} />
      <View style={styles.cardBottom}>
        <View style={styles.icons}>
          <View style={styles.iconContainer}>
            <Image source={newsLike} style={styles.icon} />
            <Text style={styles.bottomSectionNumber}>113</Text>
          </View>

          <View style={styles.iconContainer}>
            <Image source={newsComment} style={styles.icon} />
            <Text style={styles.bottomSectionNumber}>113</Text>
          </View>

          <View style={styles.iconContainer}>
            <Image source={sendIcon} style={styles.icon} />
            <Text style={styles.bottomSectionNumber}>113</Text>
          </View>
        </View>
        <View style={styles.readButton}>
          <Text style={styles.readText}>Read</Text>
        </View>
      </View>
    </View>
  );
};

export default NewsCard;
