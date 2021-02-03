import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Animated, Alert, View, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../../hooks/useReducer';
import {
  displayVideoModal,
  setVidoReferences,
  displaySubscriptionScreen,
  setVideoData,
} from '../../Redux/Reducers/helperSlice';
import { updateVideo } from '../../Redux/Reducers/firebaseSlice';
import firestore from '@react-native-firebase/firestore';
import { PLAYBACK_TIME_LIMIT_VIDEO } from '../../utils/Constants';
import styles from './styles';

const initialState = {
  paused: false,
  currentTime: 0.0,
  duration: 0.0,
  fullScreen: false,
  seekValue: 0,
  muted: false,
  volume: 1.0,
};

const VideoPlayer = ({ videoID, fileUrl }) => {
  const disp = useDispatch();
  let videoPlayerRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [finished, setFinished] = useState(false);
  const { user } = useSelector((state) => state.root.firebase);
  const [reload, setReload] = useState(false);
  let visibility = useRef(new Animated.Value(state.paused ? 0 : 1)).current;

  // useEffect(() => {
  //   Animated.timing(visibility, {
  //     toValue: state.paused ? 1 : 0,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start((result) => {
  //     setFinished(result.finished);
  //   });
  // }, [visibility, state.paused]);

  // const showControls = () => {
  //   // if (finished) {
  //   //   Animated.timing(visibility, {
  //   //     toValue: 1,
  //   //     duration: 500,
  //   //     useNativeDriver: true,
  //   //   }).start();
  //   //   if (state.paused) {
  //   //     setTimeout(() => {
  //   //       Animated.timing(visibility, {
  //   //         toValue: 0,
  //   //         duration: 1000,
  //   //         useNativeDriver: true,
  //   //       }).start();
  //   //     }, 3000);
  //   //   }
  //   // }
  //   // setControlsVisible(!controlsVisible)
  // };

  useEffect(() => {
    setReload(true);
    setTimeout(() => {
      setReload(false);
    }, 500);
  }, [fileUrl]);

  useEffect(() => {
    firestore()
      .collection('videos')
      .doc(videoID)
      .update({
        viewCount: firestore.FieldValue.increment(1),
      })
      .then((res) => {
        firestore()
          .collection('videos')
          .doc(videoID)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setTimeout(() => {
                let v = doc.data();
                disp(setVideoData(v));
                disp(updateVideo(v));
              }, 1000);
            }
          });
      });
  }, [videoID]);
  console.log('videoPlayer', videoPlayer);

  const subscriptionHandler = (data) => {
    if (data.currentTime > PLAYBACK_TIME_LIMIT_VIDEO && !user?.isPaidUser) {
      disp(displayVideoModal(false));
      disp(displaySubscriptionScreen(true));
    }
  };

  // if (controlsVisible) {
  //   setTimeout(() => {
  //     setControlsVisible(false)
  //   }, 5000)
  // }

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* <TouchableOpacity
        style={styles.closeContainer}
        onPress={() => {
          disp(displayVideoModal(false));
        }}>
        <Image source={closeIcon} style={styles.closeIcon} />
      </TouchableOpacity> */}
      {!reload ? (
        <Video
          ref={videoPlayerRef}
          source={{ uri: fileUrl }}
          onLoad={(data) => {
            dispatch({ duration: data.duration });
          }}
          onProgress={(data) => subscriptionHandler(data)}
          volume={state.volume}
          muted={state.muted}
          style={styles.backgroundVideo}
          paused={state.paused}
          controls={true}
        />
      ) : (
        <View style={[styles.backgroundVideo, styles.loadBackgroundVideo]}>
          <ActivityIndicator color={'#fff'} size={'large'} />
        </View>
      )}

      {/* <TouchableOpacity
        style={{ ...styles.container, opacity: visibility }}
        onPress={showControls}>
        {controlsVisible &&
          <Animated.View style={{ ...styles.container, }}>
            <TouchableOpacity
              style={styles.resumeContainer}
              onPress={() => {
                TrackPlayer.pause();
                dispatch({ paused: !state.paused });
              }}>
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
            <TouchableOpacity
              style={styles.closeContainer}
              onPress={() => {
                disp(displayVideoModal(false));
              }}>
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
        }
      </TouchableOpacity> */}
    </View>
  );
};

export default VideoPlayer;
