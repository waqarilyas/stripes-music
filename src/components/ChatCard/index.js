import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Avatar, Badge, withBadge } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// import styles from './styles';

const ChatCard = ({ name, avatar }) => {
  return (
    <ListItem containerStyle={styles.container}>
      <Avatar rounded source={{ uri: avatar }} size="medium" />
      <ListItem.Content>
        <ListItem.Title numberOfLines={1} style={styles.title}>
          {name}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} style={styles.message}>
          Message Text Here...
        </ListItem.Subtitle>
      </ListItem.Content>
      <View>
        <Text style={styles.time}>09:45 AM</Text>
        <Badge
          rounded
          value="99"
          status="success"
          textStyle={styles.badgeText}
          badgeStyle={styles.badge}
          containerStyle={styles.badgeContainer}
        />
      </View>
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
  time: {
    color: 'gray',
    fontSize: hp('1.5'),
    marginBottom: hp('1'),
    fontWeight: 'bold',
  },
  badgeContainer: { alignSelf: 'flex-end' },
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
