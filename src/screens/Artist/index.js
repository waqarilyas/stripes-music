import React from 'react';
import { View, Text } from 'react-native';

import ArtistsTabs from '../../navigation/tabs/ArtistsTabs';

const Artist = () => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        marginTop: 20,
      }}>
      <Text style={{ color: 'white', alignSelf: 'center' }}>
        Artist Details
      </Text>
      <ArtistsTabs />
    </View>
  );
};

export default Artist;
