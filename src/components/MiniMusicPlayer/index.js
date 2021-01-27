import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

import {
  pauseIcon,
  whitePlayIcon,
  whiteNext,
  whitePrev,
  closeIcon,
} from '../../../Assets/Icons';
import AudioPlayerSlider from '../AudioPlayerSlider';
import {
  fullScreenChange,
  changeToMiniModal,
} from '../../Redux/Reducers/audioSlice';
import styles from './styles';
import { PLAYER_CONFIG } from '../../utils/Constants';

function ControlButton({ icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.controlIcon} source={icon} />
    </TouchableOpacity>
  );
}

const MiniMusicPlayer = ({ currentTrack }) => {
  const [setCurrentTrack] = useState([]);
  const playbackState = usePlaybackState();
  const dispatch = useDispatch();

  //
  let middleButtonText = whitePlayIcon;
  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    middleButtonText = pauseIcon;
  }

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
      const trackid = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(trackid);
      setCurrentTrack(track);
    } catch (err) {
      console.log('Skip to next: ', err);
    }
  };

  const togglePlayback = async () => {
    try {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    } catch (error) {
      console.log('Play: ', error);
    }
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      const trackid = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(trackid);
      setCurrentTrack(track);
    } catch (err) {
      console.log('Skip to previous: ', err);
    }
  };

  const closeHandler = async () => {
    try {
      await TrackPlayer.reset();
    } catch (error) {}
    dispatch(changeToMiniModal(false));
  };

  return (
    <View style={styles.container}>
      <Avatar
        size="large"
        rounded
        onPress={() => dispatch(fullScreenChange(true))}
        source={currentTrack?.artwork ? { uri: currentTrack?.artwork } : null}
        containerStyle={styles.songArt}
      />
      <View style={styles.containerRight}>
        <AudioPlayerSlider screen="miniplayer" />
        <View style={styles.playerBottom}>
          <View style={styles.artistContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {currentTrack?.title}
            </Text>
            <Text style={styles.artist}>{currentTrack?.artist}</Text>
          </View>

          <View style={styles.controls}>
            <ControlButton icon={whitePrev} onPress={() => skipToPrevious()} />
            <ControlButton
              icon={middleButtonText}
              onPress={() => togglePlayback()}
            />
            <ControlButton icon={whiteNext} onPress={() => skipToNext()} />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.closeIconContainer}
        onPress={closeHandler}>
        <Image source={closeIcon} style={styles.close} />
      </TouchableOpacity>
    </View>
  );
};

export default MiniMusicPlayer;
