import React from 'react';
import { Text, View } from 'react-native';

import MusicPlayerFullScreenHeader from '../../components/MusicPlayerFullScreenHeader';
import { WhiteMinimizeIcon } from '../../../Assets/Icons';
import NowPlayingTabs from '../../navigation/Tabs/NowPlayingTabs';
import Block from '../../components/Block';
import styles from './styles';

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
