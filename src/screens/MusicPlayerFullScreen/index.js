import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  Share,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import AudioPlayerSlider from '../../components/AudioPlayerSlider';
import {
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
import randomize from 'randomatic';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { downIcon, plusIcon, shareIcon } from '../../../Assets/Icons';
import FullScreenOverlay from '../../components/FullScreenOverlay';
import styles from './styles';

const EmptyPlaylist = () => {
  return (
    <View style={styles.error}>
      <Image source={noInternetIcon} style={styles.errorImg} />
      <Text style={styles.errorMsg}>Queue is Empty</Text>
    </View>
  );
};

const MusicPlayerFullscreen = ({
  currentTrack,
  skipToNext,
  skipToPrevious,
  togglePlayback,
  handleMute,
  playNewSong,
  skipTrack,
  isVisible,
  playing,
  buffering,
  queue,
  volume,
  switchMode,
  shuffleQueue,
}) => {
  const [visible, setVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [playlistVisible, setPlaylistVisible] = useState(false);

  const { user } = useSelector((state) => state.root.firebase);
  const { currentSong } = useSelector((state) => state.root.audio);
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: Platform.OS === 'android' ? 'https://www.google.com' : '',
        url: 'https://apps.apple.com/us/app/stripes-app/id1538914059',
        title: 'Share Stripes',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToPlaylist = () => {
    if (user?.isPaidUser) {
      toggleOverlay();
    } else if (user) {
      Alert.alert(
        'Premium Account Required',
        'You must purchase Standard Subscription in order to add this song to your custom playlist',
      );
    } else {
      Alert.alert(
        'Login Required',
        'You must be logged in to add this song to your custom playlist',
      );
    }
  };

  useEffect(() => {
    const uid = auth().currentUser?.uid;
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .orderBy('createdAt', 'asc')
      .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
        let data = [];
        querySnapshot.docs.forEach((document) => {
          if (document.exists) {
            data.push(document.data());
          }
        });
        setPlaylists(data);
      });

    return () => listener;
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {}}>
      <FullScreenOverlay
        visible={visible}
        onBackdropPress={toggleOverlay}
        toggleOverlay={toggleOverlay}
        playlists={playlists}
        targetSong={currentSong}
        switchMode={switchMode}
      />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => switchMode('miniplayer')}>
            <View style={styles.headerLeft}>
              <Image source={downIcon} style={styles.arrowIcon} />
              <Text style={styles.headerTitle}>Now Playing</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            {/* <TouchableOpacity onPress={onShare}>
              <Image source={shareIcon} style={styles.icon} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={addToPlaylist}>
              <Image source={plusIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.fullscreenContainer}>
          <View
            style={
              playlistVisible
                ? styles.playlistOpenCorousalContainer
                : styles.corousalContainer
            }>
            <Image
              source={
                currentTrack?.artwork ? { uri: currentTrack?.artwork } : null
              }
              style={
                playlistVisible
                  ? styles.playlistOpenStyleForImage
                  : styles.imageBackground
              }
            />
          </View>
          <View
            style={
              playlistVisible
                ? styles.playlistOpenTitleContainer
                : styles.FullScreenTitleContainer
            }>
            <Text
              style={
                playlistVisible ? styles.playlistOpenTitle : styles.FullTitle
              }
              numberOfLines={2}>
              {currentTrack?.title}
            </Text>
            <Text style={styles.FullSubtitle}>{currentTrack?.artist}</Text>
          </View>

          {/* Audio Player Slider */}
          <AudioPlayerSlider />

          <View
            style={
              playlistVisible
                ? styles.playlistOpenControls
                : styles.fullscreenControls
            }>
            {playlistVisible && (
              <TouchableOpacity
                onPress={() => setPlaylistVisible(!playlistVisible)}>
                <Image
                  source={playlist}
                  style={
                    playlistVisible
                      ? styles.playlistOpenIcon
                      : styles.fullscreenIcon
                  }
                />
              </TouchableOpacity>
            )}

            {/* Previous Button */}
            <TouchableOpacity onPress={skipToPrevious}>
              <Image
                source={whitePrev}
                style={
                  playlistVisible
                    ? styles.playlistOpenIcon
                    : styles.fullscreenIcon
                }
              />
            </TouchableOpacity>

            {/* Play/Pause Button */}

            {buffering ? (
              <View style={styles.loading}>
                <ActivityIndicator color={'black'} />
              </View>
            ) : (
              <TouchableOpacity onPress={togglePlayback}>
                <Image
                  source={playing ? pauseButton : playButton}
                  style={
                    playlistVisible
                      ? styles.playlistOpenMiddleIcon
                      : styles.fullscreenMiddleIcon
                  }
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={skipToNext}>
              <Image
                source={whiteNext}
                style={
                  playlistVisible
                    ? styles.playlistOpenIcon
                    : styles.fullscreenIcon
                }
              />
            </TouchableOpacity>
            {playlistVisible ? (
              <TouchableOpacity onPress={handleMute}>
                <Image
                  source={volume === 0 ? muteIcon : speaker}
                  style={
                    playlistVisible
                      ? styles.playlistOpenIcon
                      : styles.fullscreenIcon
                  }
                />
              </TouchableOpacity>
            ) : null}
          </View>

          {playlistVisible ? null : (
            <View
              style={
                playlistVisible
                  ? styles.playlistOpenIconContainer
                  : styles.playlistIconsContainer
              }>
              {/* Playlist icon */}
              <TouchableOpacity
                onPress={() => setPlaylistVisible(!playlistVisible)}>
                <Image
                  source={playlist}
                  style={
                    playlistVisible
                      ? styles.playlistOpenIcon
                      : styles.fullscreenIcon
                  }
                />
              </TouchableOpacity>

              {/* Like icon */}
              {/* <TouchableOpacity>
                  <Image
                    source={heartIcon}
                    style={
                      isVisible
                        ? styles.playlistOpenHeartIcon
                        : styles.heartIcon
                    }
                  />
                </TouchableOpacity> */}

              {/* Mute icon */}
              <TouchableOpacity onPress={handleMute}>
                <Image
                  source={volume === 0 ? muteIcon : speaker}
                  style={
                    playlistVisible
                      ? styles.playlistOpenIcon
                      : styles.fullscreenIcon
                  }
                />
              </TouchableOpacity>
            </View>
          )}
          {/* Playlists Start here */}
          {playlistVisible ? (
            <>
              <View style={styles.playlistsHeader}>
                <Text style={styles.upNext}>UP NEXT</Text>
                <View style={styles.headerRight}>
                  <Image source={swapIcon} style={styles.swapIcon} />
                  <TouchableOpacity onPress={() => shuffleQueue(queue)}>
                    <View style={styles.randomButton}>
                      <Image source={shuffleIcon} style={styles.shuffleIcon} />
                      <Text style={styles.randomButtonText}>Random</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <FlatList
                data={queue}
                ListEmptyComponent={<EmptyPlaylist />}
                contentContainerStyle={{
                  minHeight: `80%`,
                }}
                keyExtractor={() => randomize('Aa0!', 10)}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => playNewSong(item)}
                      style={{ flex: 1 }}>
                      <FullScreenPlaylistCard item={item} />
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          ) : null}
          {/* Playlists End here */}
        </View>
      </SafeAreaView>
      {/* <MusicPlayerRelated /> */}
    </Modal>
  );
};

export default MusicPlayerFullscreen;
