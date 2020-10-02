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

const RelatedNewsCard = ({ title, image }) => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../Assets/Images/songCover4.jpg')}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>A Long Title Goes Here</Text>
        <Text style={styles.subtitle} n>
          ListItems are used to display rows of information, such as a contact
          list, playlist, or menu. They are very customizeable and can contain
          switches, avatars, badges, icons, and more.
        </Text>
      </View>
    </View>
  );
};

export default RelatedNewsCard;
