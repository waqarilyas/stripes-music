import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';

import styles from './styles';
import Block from '../../components/Block';
import UserChatCard from '../../components/UserChatCard';
import ArtistChatCard from '../../components/ArtistChatCard';
import { sendIcon } from '../../../Assets/Icons';

const MessageDetail = () => {
  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <UserChatCard text="Hello!" />
      <UserChatCard text="Open the chat on your smartphone for better conversation" />
      <Text style={styles.time}>10: 45 AM</Text>
      <ArtistChatCard text="Hey jo!, I'm listening the new song of lisa." />
      <ArtistChatCard text="I'm in love!" />
      <Text style={styles.time2}>10: 45 AM</Text>

      <View style={styles.input}>
        <TextInput
          placeholder="Type Here"
          placeholderTextColor="#969395"
          placeHolder
          style={styles.textInput}
        />
        <Image source={sendIcon} style={styles.sendIcon} />
      </View>
    </View>
  );
};

export default MessageDetail;
