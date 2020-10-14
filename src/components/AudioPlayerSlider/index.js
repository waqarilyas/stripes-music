import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import { convertToMinutes } from '../../utils/Helpers';
import { RFValue } from 'react-native-responsive-fontsize';

const AudioPlayerSlider = ({ screen }) => {
  const progressData = useTrackPlayerProgress();
  return (
    <View style={styles.slider}>
      {screen != 'miniplayer' ? (
        <Text style={styles.timer}>
          {convertToMinutes(Math.floor(progressData.position))}
        </Text>
      ) : null}
      <Slider
        value={progressData.position}
        maximumValue={progressData.duration}
        minimumValue={0}
        onValueChange={(value) => TrackPlayer.seekTo(value)}
        maximumTrackTintColor="grey"
        minimumTrackTintColor="#CA01A1"
        step={1}
        trackStyle={{
          height: 6,
          width: RFValue(230),
        }}
        thumbStyle={{
          height: 10,
          width: 10,
          backgroundColor: '#CA01A1',
        }}
      />
      {screen != 'miniplayer' ? (
        <Text style={styles.timer}>
          {parseFloat(convertToMinutes(progressData.duration)).toFixed(2)}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timer: {
    color: 'grey',
    flex: 0.4,
  },
});

export default AudioPlayerSlider;
