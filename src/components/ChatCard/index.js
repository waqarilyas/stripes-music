import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Avatar, Badge, withBadge } from 'react-native-elements';

import styles from './styles';

const ChatCard = ({}) => {
  return (
    <ListItem bottomDivider containerStyle={{ backgroundColor: 'black' }}>
      <Avatar
        rounded
        source={require('../../../Assets/Images/songCover5.jpg')}
        size="medium"
      />
      <ListItem.Content>
        <ListItem.Title style={{ color: 'white' }}>User Name</ListItem.Title>
        <ListItem.Subtitle style={{ color: '#858185' }}>
          Message Text Here...
        </ListItem.Subtitle>
      </ListItem.Content>
      <View>
        <Text style={{ color: '#858185' }}>09:45 AM</Text>
        <Badge
          rounded
          value="9+"
          status="success"
          textStyle={{ color: 'black' }}
          badgeStyle={{
            backgroundColor: '#41D47B',
            height: 30,
            width: 30,
            borderRadius: 20,
            elevation: 0,
          }}
        />
      </View>
    </ListItem>
  );
};

export default ChatCard;
