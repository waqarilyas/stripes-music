import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const Community = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('NewMessage')}>
        <Text style={{ color: 'white' }}>Go to NewMessage</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MessageDetail')}>
        <Text style={{ color: 'white' }}>Go to MessageDetail</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Community;
