import React, { useEffect, useReducer, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Slider } from 'react-native-elements';
import Video from 'react-native-video';

import styles from './styles';
import reducer from '../../hooks/useReducer';
import {
  fullscreenIcon,
  closeIcon,
  playIcon,
  pauseIcon,
} from '../../../Assets/Icons';
import { convertToMinutes } from '../../utils/Helpers';

const initialState = {
  paused: true,
  currentTime: 0.0,
  duration: 0.0,
  fullScreen: false,
  seekValue: 0,
  muted: false,
  volume: 1.0,
};

const VideoPlayer = ({ fileUrl, onPress }) => {
  const videoPlayer = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [finished, setFinished] = useState(false);

  let visibility = useRef(new Animated.Value(state.paused ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(visibility, {
      toValue: state.paused ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start((result) => {
      setFinished(result.finished);
    });
  }, [visibility, state.paused]);

  const showControls = () => {
    if (finished) {
      Animated.timing(visibility, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      if (state.paused) {
        setTimeout(() => {
          Animated.timing(visibility, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        }, 3000);
      }
    }
  };

  return (
    <View>
      <Video
        ref={videoPlayer}
        source={{ uri: fileUrl }}
        onLoad={(data) => {
          console.log('On Load Fired!');
          dispatch({ duration: data.duration });
        }}
        onProgress={(data) => {
          dispatch({ currentTime: data.currentTime });
        }}
        volume={state.volume}
        muted={state.muted}
        style={styles.backgroundVideo}
        paused={state.paused}
        controls={false}
      />

      <TouchableOpacity
        style={{ ...styles.container, opacity: visibility }}
        onPress={showControls}>
        <Animated.View style={{ ...styles.container, opacity: visibility }}>
          <TouchableOpacity
            style={styles.resumeContainer}
            onPress={() => dispatch({ paused: !state.paused })}>
            <Image
              source={state.paused ? playIcon : pauseIcon}
              style={styles.resumeIcon}
            />
          </TouchableOpacity>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>
              {convertToMinutes(Math.floor(state.currentTime))}
            </Text>
            <Text style={styles.time}>
              {convertToMinutes(Math.floor(state.duration))}
            </Text>
          </View>
          <TouchableOpacity style={styles.closeContainer} onPress={onPress}>
            <Image source={closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fullScreenContainer}
            onPress={() => videoPlayer.current.presentFullscreenPlayer()}>
            <Image source={fullscreenIcon} style={styles.fullScreenIcon} />
          </TouchableOpacity>
          <Slider
            style={styles.seek}
            minimumValue={0}
            onValueChange={(value) => videoPlayer.current.seek(value)}
            thumbStyle={styles.thumb}
            thumbTintColor="white"
            maximumValue={state.duration}
            value={state.currentTime}
            minimumTrackTintColor="#E81093"
            maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayer;
