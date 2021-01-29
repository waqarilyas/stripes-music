import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import { emptyChatIcon } from '../../../Assets/Icons';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { setIsChatNotPaid } from '../../Redux/Reducers/helperSlice';

const EmptyChatList = ({ navigation }) => {
  const { user } = useSelector((state) => state.root.firebase);
  const dispatch = useDispatch();

  const handleMessage = () => {
    if (user?.isPaidUser) {
      navigation.navigate('NewMessage');
    } else {
      dispatch(setIsChatNotPaid(true));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={emptyChatIcon} style={styles.icon} />
      <Text style={styles.text}>Start a Chat</Text>
      <Button
        type="solid"
        title="New Message"
        buttonStyle={styles.buttonContainer}
        titleStyle={styles.titleStyle}
        onPress={handleMessage}
      />
    </View>
  );
};

export default EmptyChatList;
