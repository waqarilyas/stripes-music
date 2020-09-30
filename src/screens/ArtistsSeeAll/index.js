import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const ArtistsSeeAll = ({ navigation }) => {
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

export default ArtistsSeeAll;
