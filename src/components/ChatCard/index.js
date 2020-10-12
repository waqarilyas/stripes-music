import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import dayjs from 'dayjs';

// import styles from './styles';
let placeholder =
  'https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg';

const ChatCard = ({ name, avatar, createdAt, message, status }) => {
  return (
    <ListItem containerStyle={styles.container}>
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
      <Text style={styles.time}>
        {dayjs(createdAt._seconds).format('hh:mm A')}
      </Text>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: hp('1.8'),
    fontWeight: 'bold',
  },
  message: {
    color: 'gray',
    fontSize: hp('1.7'),
    marginTop: hp('1'),
  },
  unreadMessage: {
    color: 'gray',
    fontSize: hp('1.7'),
    fontWeight: 'bold',
    marginTop: hp('1'),
  },
  time: {
    color: 'gray',
    fontSize: hp('1.3'),
    fontWeight: 'bold',
    height: '100%',
  },
  badgeContainer: {
    alignSelf: 'flex-end',
  },
  iconStyle: {
    borderWidth: 2,
    borderColor: 'white',
  },
  badge: {
    backgroundColor: '#41D47B',
    height: 25,
    width: 25,
    borderRadius: 20,
    borderColor: '#41D47B',
    elevation: 0,
  },
  badgeText: {
    color: 'black',
    fontSize: hp('1.2'),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default ChatCard;
