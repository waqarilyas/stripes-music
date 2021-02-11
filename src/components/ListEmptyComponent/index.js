import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import { emptyChatIcon, noNewsIcon } from '../../../Assets/Icons';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { setIsChatNotPaid } from '../../Redux/Reducers/helperSlice';

const ListEmptyComponent = ({ navigation }) => {
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
      <Image source={noNewsIcon} style={styles.icon} />
      <Text style={styles.text}>No news yet!</Text>
    </View>
  );
};

export default ListEmptyComponent;
