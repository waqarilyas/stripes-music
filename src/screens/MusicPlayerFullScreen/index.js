import React from 'react';
import { View } from 'react-native';

import NowPlayingTabs from '../../navigation/tabs/NowPlayingTabs';

const MusicPlayerFullscreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: 'red' }}>
      {/* <MusicPlayerFullScreenHeader />
      <Text style={{ color: 'white' }}>Displaying text</Text>
      <View style={{ flex: 1, backgroundColor: 'red' }}> */}
      <NowPlayingTabs />
      {/* </View> */}
    </View>
  );
};

export default MusicPlayerFullscreen;
