import randomize from 'randomatic';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';

import {
  heartIcon,
  muteIcon,
  noInternetIcon,
  pauseButton,
  playButton,
  playlist,
  shuffleIcon,
  speaker,
  swapIcon,
  whiteNext,
  whitePrev,
} from '../../../Assets/Icons';
import FullScreenPlaylistCard from '../../components/FullScreenPlaylistCard';
import { isInitialPlay } from '../../Redux/Reducers/audioSlice';
import { LOG } from '../../utils/Constants';
import AudioPlayerSlider from '../AudioPlayerSlider';
import MiniMusicPlayer from '../MiniMusicPlayer';
import styles from './styles';

// Control Buttons for mini player
const ControlButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.controlIcon} source={icon} />
    </TouchableOpacity>
  );
};

const EmptyPlaylist = () => {
  return (
    <View style={styles.error}>
      <Image source={noInternetIcon} style={styles.errorImg} />
      <Text style={styles.errorMsg}>Queue is Empty</Text>
    </View>
  );
};

const Player = ({ screen }) => {
  const playbackState = usePlaybackState();
  const [isVisible, setIsVisible] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [currentTrack, setCurrentTrack] = useState([]);

  const currentSong = useSelector((state) => state.root.audio.currentSong);
  const queue = useSelector((state) => state.root.audio.playlist);
  const firstTime = useSelector((state) => state.root.audio.initialPlay);

  const dispatch = useDispatch();

  useTrackPlayerEvents(['playback-track-changed'], async (event) => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setCurrentTrack(track);
    }
  });

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
      const trackid = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(trackid);
      setCurrentTrack(track);
    } catch (err) {
      LOG('SKIP TO NEXT', err);
    }
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      const trackid = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(trackid);
      setCurrentTrack(track);
    } catch (err) {
      LOG('SKIP TO PREVIOUS', err);
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

  // full screen icons
  let fullscreenMiddleButtonText = playButton;
  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    fullscreenMiddleButtonText = pauseButton;
  }

  const mute = async () => {
    try {
      setIsMute(!isMute);
      isMute ? await TrackPlayer.setVolume(0) : await TrackPlayer.setVolume(1);
    } catch (err) {
      LOG('MUTE ERROR', err);
    }
  };

  const skipTrack = async () => {
    try {
      await TrackPlayer.skip(currentSong.id);
      await TrackPlayer.play();
    } catch (err) {
      LOG('SKIP TRACK', err);
    }
  };

  // Function is called initially when
  // the first song is played
  const playSong = async () => {
    await TrackPlayer.play();
  };

  useEffect(() => {
    setCurrentTrack(currentSong);
    if (firstTime) {
      playSong();
      dispatch(isInitialPlay(false));
    } else {
      skipTrack();
    }
  }, [currentSong]);

  return (
    <>
      {/*  Mini Player */}
      {screen === 'miniplayer' ? (
        <MiniMusicPlayer currentTrack={currentTrack} />
      ) : null}
      {/* mini Player ends here */}

      {/* full screen player starts here */}
      {screen === 'fullscreen' ? (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.fullscreenContainer}>
            <View
              style={
                isVisible
                  ? styles.playlistOpenCorousalContainer
                  : styles.corousalContainer
              }>
              {/* <FlatList
              data={currentSong.artwork}
              horizontal
              keyExtractor={() => randomize('Aa0!', 10)}
              renderItem={({ item }) => {
                return ( */}
              <Image
                source={{ uri: currentTrack.artwork }}
                style={
                  isVisible
                    ? styles.playlistOpenStyleForImage
                    : styles.imageBackground
                }
              />
              {/* );
              }}
            /> */}
            </View>

            {/* {!isVisible ? (
            <Image source={slider2} style={styles.sliderIcon} />
          ) : null} */}

            {/* Title & Artist */}
            <View
              style={
                isVisible
                  ? styles.playlistOpenTitleContainer
                  : styles.FullScreenTitleContainer
              }>
              <Text
                style={isVisible ? styles.playlistOpenTitle : styles.FullTitle}
                numberOfLines={2}>
                {currentTrack.title}
              </Text>
              <Text style={styles.FullSubtitle}>{currentTrack.artist}</Text>
            </View>

            {/* Audio Player Slider */}
            <AudioPlayerSlider />

            <View style={styles.fullscreenControls}>
              {/* Previous Button */}
              <TouchableOpacity onPress={() => skipToPrevious()}>
                <Image
                  source={whitePrev}
                  style={
                    isVisible ? styles.playlistOpenIcon : styles.fullscreenIcon
                  }
                />
              </TouchableOpacity>

              {/* Previous Button */}
              <TouchableOpacity onPress={() => togglePlayback()}>
                <Image
                  source={fullscreenMiddleButtonText}
                  style={
                    isVisible
                      ? styles.playlistOpenMiddleIcon
                      : styles.fullscreenMiddleIcon
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => skipToNext()}>
                <Image
                  source={whiteNext}
                  style={
                    isVisible ? styles.playlistOpenIcon : styles.fullscreenIcon
                  }
                />
              </TouchableOpacity>
            </View>

            <View
              style={
                isVisible
                  ? styles.playlistOpenIconContainer
                  : styles.playlistIconsContainer
              }>
              {/* Playlist icon */}
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <Image
                  source={playlist}
                  style={
                    isVisible ? styles.playlistOpenIcon : styles.fullscreenIcon
                  }
                />
              </TouchableOpacity>

              {/* Like icon */}
              <TouchableOpacity>
                <Image
                  source={heartIcon}
                  style={
                    isVisible ? styles.playlistOpenHeartIcon : styles.heartIcon
                  }
                />
              </TouchableOpacity>

              {/* Mute icon */}
              <TouchableOpacity onPress={mute}>
                <Image
                  source={isMute ? speaker : muteIcon}
                  style={
                    isVisible ? styles.playlistOpenIcon : styles.fullscreenIcon
                  }
                />
              </TouchableOpacity>
            </View>

            {/* Playlists Start here */}
            {isVisible ? (
              <>
                <View style={styles.playlistsHeader}>
                  <Text style={styles.upNext}>UP NEXT</Text>
                  <View style={styles.headerRight}>
                    <Image source={swapIcon} style={styles.swapIcon} />
                    <View style={styles.randomButton}>
                      <Image source={shuffleIcon} style={styles.shuffleIcon} />
                      <Text style={styles.randomButtonText}>Random</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View style={{ flex: 1 }}>
                    <ScrollView>
                      <FlatList
                        data={queue}
                        ListEmptyComponent={<EmptyPlaylist />}
                        keyExtractor={() => randomize('Aa0!', 10)}
                        renderItem={({ item }) => {
                          console.log('---Flatlist Item----', item);
                          return <FullScreenPlaylistCard item={item} />;
                        }}
                      />
                    </ScrollView>
                  </View>
                </View>
              </>
            ) : null}
            {/* Playlists End here */}
          </View>
        </SafeAreaView>
      ) : null}

      {/* full screen player ends here */}
    </>
  );
};

export default Player;
