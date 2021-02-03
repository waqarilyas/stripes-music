import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
  pauseIcon,
  whitePlayIcon,
  whiteNext,
  whitePrev,
  closeIcon,
} from '../../../Assets/Icons';
import AudioPlayerSlider from '../AudioPlayerSlider';
import styles from './styles';

function ControlButton({ icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.controlIcon} source={icon} />
    </TouchableOpacity>
  );
}

const MiniMusicPlayer = ({
  currentTrack,
  skipToNext,
  skipToPrevious,
  togglePlayback,
  playing,
  buffering,
  closePlayer,
  switchMode,
  isVisible = true,
}) => {
  return isVisible ? (
    <View style={styles.container}>
      <Avatar
        size="large"
        rounded
        onPress={() => switchMode('fullscreen')}
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
              icon={playing || buffering ? pauseIcon : whitePlayIcon}
              onPress={() => togglePlayback()}
            />
            <ControlButton icon={whiteNext} onPress={() => skipToNext()} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.closeIconContainer} onPress={closePlayer}>
        <Image source={closeIcon} style={styles.close} />
      </TouchableOpacity>
    </View>
  ) : null;
};

export default MiniMusicPlayer;
