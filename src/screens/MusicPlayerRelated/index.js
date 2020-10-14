import React, { useRef, useState, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import Player from '../../components/Player';
import { useSelector, useDispatch } from 'react-redux';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

// import playlist from './playlist.json';
import { pushToPlaylist } from '../../Redux/Reducers/audioSlice';
import styles from './styles';

const MusicPlayerRelated = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Player screen="fullscreen" />
    </View>
  );
};

export default MusicPlayerRelated;
