import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const Playlist = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Artist')}>
        <Text style={{ color: 'white' }}>Go to Artist Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Playlist;
