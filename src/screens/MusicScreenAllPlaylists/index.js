import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';
import Button from '../../components/Button';

const MusicScreenAllPlayLists = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MusicScreenCreateNewPlaylist')}>
        <Text style={{ color: 'white' }}>Go to create new Playlist screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('MusicScreenCreateNewPlaylist')}>
        <Text style={{ color: 'white' }}>Go To Playlist Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MusicScreenAllPlayLists;
