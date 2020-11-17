import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import { emptyChatIcon } from '../../../Assets/Icons';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { setIsChatNotPaid } from '../../Redux/Reducers/helperSlice';

const EmptyChatList = ({ navigation }) => {
  let user = useSelector(state => state.root.firebase.user)
  const dist = useDispatch()
  return (
    <View style={styles.container}>
      <Image source={emptyChatIcon} style={styles.icon} />
      <Text style={styles.text}>Start a chat with an Artist</Text>
      <Button
        type="solid"
        title="New Message"
        buttonStyle={styles.buttonContainer}
        titleStyle={styles.titleStyle}
        onPress={() => {
          if (user.isPaidUser)
            navigation.navigate('NewMessage')
          else
            dist(setIsChatNotPaid(true))
        }}
      />
    </View>
  );
};

export default EmptyChatList;
