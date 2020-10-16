import randomize from 'randomatic';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import {
  muteIcon,
  noInternetIcon,
  pauseButton,
  pauseIcon,
  playButton,
  playlist,
  shuffleIcon,
  slider2,
  speaker,
  swapIcon,
  whiteNext,
  whitePlayIcon,
  whitePrev,
  heartIcon,
} from '../../../Assets/Icons';
import FullScreenPlaylistCard from '../../components/FullScreenPlaylistCard';
import { fullScreenChange } from '../../Redux/Reducers/audioSlice';
import AudioPlayerSlider from '../AudioPlayerSlider';
import styles from './styles';
import { pushToPlaylist } from '../../Redux/Reducers/audioSlice';

// control Buttons for mini player
function ControlButton({ title, icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.controlIcon} source={icon} />
    </TouchableOpacity>
  );
}

export const Player = ({ screen }) => {
  const playbackState = usePlaybackState();
  const [isVisible, setIsVisible] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [currentTrack, setCurrentTrack] = useState([]);

  const currentSong = useSelector((state) => state.root.audio.currentSong);
  const queue = useSelector((state) => state.root.audio.playlist);

  const dispatch = useDispatch();

  useTrackPlayerEvents(['playback-track-changed'], async (event) => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artist, artwork } = track || {};
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
      console.log('Skip to next: ', err);
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

  // mini screen icons

  var middleButtonText = whitePlayIcon;

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    middleButtonText = pauseIcon;
  }
  // mini screen icons end here

  //full screen icons
  var fullscreenMiddleButtonText = playButton;
  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    fullscreenMiddleButtonText = pauseButton;
  }
  //full screen icons end here

  const mute = async () => {
    setIsMute(!isMute);
    isMute ? await TrackPlayer.setVolume(0) : await TrackPlayer.setVolume(1);
  };

  const obj = {
    artist: currentSong.artist,
    id: currentSong.id,
    artwork: currentSong.artwork[0],
    url: currentSong.url,
    title: currentSong.title,
  };

  const getCurrentTrack = () => {
    setCurrentTrack(obj);
  };

  const addToQueue = async () => {
    await TrackPlayer.add(obj);
    await TrackPlayer.skip(currentSong.id);
    await TrackPlayer.play();
  };

  useEffect(() => {
    getCurrentTrack();
    addToQueue();
    dispatch(pushToPlaylist(currentSong));
  }, []);

  return (
    <>
      {/*  mini Player */}
      {screen === 'miniplayer' ? (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Avatar
              size="large"
              rounded
              onPress={() => dispatch(fullScreenChange(true))}
              avatarStyle={styles.cover}
              source={{ uri: currentTrack.artwork }}
            />
          </View>
          <View style={styles.containerRight}>
            <AudioPlayerSlider screen="miniplayer" />
            <View style={styles.playerBottom}>
              <View style={styles.artistContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {currentTrack.title}
                </Text>
                <Text style={styles.artist}>{currentTrack.artist}</Text>
              </View>

              <View style={styles.controls}>
                <ControlButton
                  icon={whitePrev}
                  onPress={() => skipToPrevious()}
                />
                <ControlButton
                  icon={middleButtonText}
                  onPress={() => togglePlayback()}
                />
                <ControlButton icon={whiteNext} onPress={() => skipToNext()} />
              </View>
            </View>
          </View>
        </View>
      ) : null}
      {/* mini Player ends here */}

      {/* full screen player starts here */}
      {screen === 'fullscreen' ? (
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

          <AudioPlayerSlider />

          <View style={styles.fullscreenControls}>
            <TouchableOpacity onPress={() => skipToPrevious()}>
              <Image
                source={whitePrev}
                style={
                  isVisible ? styles.playlistOpenIcon : styles.fullscreenIcon
                }
              />
            </TouchableOpacity>

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
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              <Image
                source={playlist}
                style={
                  isVisible ? styles.playlistOpenIcon : styles.fullscreenIcon
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={heartIcon}
                style={
                  isVisible ? styles.playlistOpenHeartIcon : styles.heartIcon
                }
              />
            </TouchableOpacity>

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
              <ScrollView>
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
                {queue.length > 0 ? (
                  <FlatList
                    data={queue}
                    keyExtractor={() => randomize('Aa!0', 10)}
                    renderItem={({ item }) => {
                      return <FullScreenPlaylistCard item={item} />;
                    }}
                  />
                ) : (
                  <View style={styles.error}>
                    <Image source={noInternetIcon} style={styles.errorImg} />
                    <Text style={styles.errorMsg}>No Songs in queue yet! </Text>
                  </View>
                )}
              </ScrollView>
            </>
          ) : null}
          {/* Playlists End here */}
        </View>
      ) : null}

      {/* full screen player ends here */}
    </>
  );
};

export default Player;
