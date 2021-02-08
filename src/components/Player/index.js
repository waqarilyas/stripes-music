import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text } from 'react-native';
import TrackPlayer, {
  STATE_READY,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSong,
  changeToMiniModal,
  fullScreenChange,
  isInitialPlay,
  setPlaylist,
} from '../../Redux/Reducers/audioSlice';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';
import { LOG } from '../../utils/Constants';

import MiniMusicPlayer from '../MiniMusicPlayer';
import MusicPlayerFullscreen from '../../screens/MusicPlayerFullScreen';
import styles from './styles';
import { shuffleArray } from '../../utils/Helpers';

const Player = ({ screen }) => {
  const playbackState = usePlaybackState();
  const [volume, setVolume] = useState(null);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [buffering, setBuffering] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [playerMode, setPlayerMode] = useState();
  const currentSong = useSelector((state) => state.root.audio.currentSong);
  const queue = useSelector((state) => state.root.audio.playlist);
  const firstTime = useSelector((state) => state.root.audio.initialPlay);
  const dispatch = useDispatch();

  useEffect(() => {
    TrackPlayer.getVolume().then((level) => setVolume(level));
    setCurrentTrack(currentSong);
    if (firstTime) {
      playSong();
      dispatch(isInitialPlay(false));
    } else {
      skipTrack();
    }
  }, [currentSong]);

  useEffect(() => {
    setPlayerMode(screen);
  }, [screen]);

  useEffect(() => {
    switch (playbackState) {
      case TrackPlayer.STATE_PLAYING:
        setPlaying(true);
        setBuffering(false);
        break;
      case TrackPlayer.STATE_BUFFERING:
        setBuffering(true);
        break;
      case TrackPlayer.STATE_PAUSED:
      case TrackPlayer.STATE_NONE:
      case TrackPlayer.STATE_STOPPED:
      case TrackPlayer.STATE_READY:
        setPlaying(false);
        setBuffering(false);
        break;
    }
  }, [playbackState]);

  useTrackPlayerEvents(['playback-track-changed'], async (event) => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setCurrentTrack(track);
    }
  });

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
      const trackId = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(trackId);
      dispatch(changeSong(track));
      setCurrentTrack(track);
    } catch (err) {
      LOG('SKIP TO NEXT', err);
    }
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      const trackId = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(trackId);
      dispatch(changeSong(track));
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

  const handleMute = async () => {
    try {


      await TrackPlayer.setVolume(volume === 0 ? 1 : 0).then(() =>
        setVolume(volume === 0 ? 1 : 0),
      );
    } catch (err) {
      LOG('MUTE ERROR', err);
    }
  };

  const skipTrack = () => {
    TrackPlayer.skip(currentSong.id).then(() => TrackPlayer.play());
  };

  const playNewSong = async ({ title, artist, artwork, url, duration, id }) => {
    await TrackPlayer.reset();
    try {
      const result = {
        title,
        artist,
        artwork,
        url,
        duration,
        id,
        createdAt: +new Date(),
      };
      dispatch(changeSong(result));
      // dispatch(pushToPlaylist(result));
      await TrackPlayer.add(result);
      // dispatch(fullScreenChange(true));
      dispatch(addPlayCount(id));
      dispatch(addToRecentlyPlayed(result));
    } catch (error) {
      LOG('PLAY SONG', error);
    }
  };

  const switchMode = (screen) => {
    if (screen === 'miniplayer') {
      setPlayerMode('miniplayer');
    } else if (screen === 'fullscreen') {
      setPlayerMode('fullscreen');
    }
  };

  // Function is called initially when
  // the first song is played
  const playSong = async () => await TrackPlayer.play();

  const closePlayer = async () => {
    try {
      await TrackPlayer.reset();
      dispatch(fullScreenChange(false));
      dispatch(changeToMiniModal(false));
    } catch (error) { }
  };

  const shuffleQueue = (queue) => {
    let newQueue = shuffleArray(queue);
    dispatch(setPlaylist(newQueue));
    TrackPlayer.reset();
    TrackPlayer.add(newQueue);
    TrackPlayer.play();
  };

  return (
    <>
      <MiniMusicPlayer
        isVisible={playerMode === 'miniplayer'}
        currentTrack={currentTrack}
        skipToNext={skipToNext}
        skipToPrevious={skipToPrevious}
        togglePlayback={togglePlayback}
        playing={playing}
        buffering={buffering}
        closePlayer={closePlayer}
        switchMode={switchMode}
      />
      <MusicPlayerFullscreen
        isVisible={playerMode === 'fullscreen'}
        currentTrack={currentTrack}
        skipToNext={skipToNext}
        skipToPrevious={skipToPrevious}
        skipTrack={skipTrack}
        togglePlayback={togglePlayback}
        playNewSong={playNewSong}
        handleMute={handleMute}
        playing={playing}
        buffering={buffering}
        queue={queue}
        volume={volume}
        switchMode={switchMode}
        shuffleQueue={shuffleQueue}
      />
    </>
  );
};

export default Player;
