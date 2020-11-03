import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import { emptyChatIcon } from '../../../Assets/Icons';
import { Button } from 'react-native-elements';

const EmptyChatList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={emptyChatIcon} style={styles.icon} />
      <Text style={styles.text}>Start a chat with an Artist</Text>
      <Button
        type="solid"
        title="New Message"
        buttonStyle={styles.buttonContainer}
        titleStyle={styles.titleStyle}
        onPress={() => navigation.navigate('NewMessage')}
      />
    </View>
  );
};

export default EmptyChatList;
