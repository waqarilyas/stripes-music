import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const NewsLatest = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('NewsDetails')}>
        <Text style={{ color: 'white' }}>Go to NewsDetails</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewsLatest;
