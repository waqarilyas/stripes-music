import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Slider } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';

import { convertToMinutes } from '../../utils/Helpers';

const MiniPlayerSlider = ({ progressData }) => {
  return (
    <View style={styles.slider}>
      <Slider
        value={progressData.position}
        maximumValue={progressData.duration}
        minimumValue={0}
        onValueChange={(value) => TrackPlayer.seekTo(value)}
        maximumTrackTintColor="grey"
        minimumTrackTintColor="#CA01A1"
        step={1}
        thumbStyle={styles.thumbStyle}
        style={styles.trackStyle}
      />
    </View>
  );
};

const FullScreenSlider = ({ progressData }) => {
  return (
    <View style={styles.fullScreenSlider}>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>
          {convertToMinutes(Math.floor(progressData.position))}
        </Text>
      </View>
      <Slider
        value={progressData.position}
        maximumValue={progressData.duration}
        minimumValue={0}
        onValueChange={(value) => TrackPlayer.seekTo(value)}
        maximumTrackTintColor="grey"
        minimumTrackTintColor="#CA01A1"
        step={1}
        thumbStyle={styles.thumbStyle}
        style={styles.fullScreenTrackStyle}
      />
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>
          {convertToMinutes(Math.floor(progressData.duration))}
        </Text>
      </View>
    </View>
  );
};

const AudioPlayerSlider = ({ screen }) => {
  const progressData = useTrackPlayerProgress();

  if (screen === 'miniplayer') {
    return <MiniPlayerSlider progressData={progressData} />;
  } else {
    return <FullScreenSlider progressData={progressData} />;
  }
};

const styles = StyleSheet.create({
  slider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  fullScreenSlider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  timer: {
    color: 'grey',
  },
  trackStyle: {
    width: '100%',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  fullScreenTrackStyle: {
    width: '70%',
  },
  thumbStyle: {
    height: 10,
    width: 10,
    backgroundColor: '#CA01A1',
  },
});

export default AudioPlayerSlider;
