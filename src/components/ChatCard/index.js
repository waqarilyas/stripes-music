import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

import styles from './styles';
import { deleteIcon } from '../../../Assets/Icons';

const ChatCard = ({
  name,
  avatar,
  message,
  status,
  onPress,
  onDeletePress,
}) => {
  return (
    <ListItem containerStyle={styles.container} onPress={onPress}>
      <Avatar
        rounded
        source={{ uri: avatar }}
        size="medium"
        containerStyle={{
          ...styles.iconStyle,
          borderColor: status ? 'transparent' : 'purple',
        }}
      />
      <ListItem.Content>
        <ListItem.Title numberOfLines={1} style={styles.title}>
          {name}
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          style={status ? styles.message : styles.unreadMessage}>
          {message}
        </ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity style={styles.delete} onPress={onDeletePress}>
        <Image source={deleteIcon} style={styles.icon} />
      </TouchableOpacity>
    </ListItem>
  );
};

export default ChatCard;
