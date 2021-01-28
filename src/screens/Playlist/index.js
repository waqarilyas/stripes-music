import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { playlistDefault } from '../../../Assets/Icons';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/dist/Ionicons';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import randomize from 'randomatic';
import { backIcon } from '../../../Assets/Icons';
import { LOG } from '../../utils/Constants';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
import FullScreenOverlay from '../../components/FullScreenOverlay';
import styles from './styles';
import { changeToMiniModal, changeSong } from '../../Redux/Reducers/audioSlice';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';

const Playlist = ({ navigation, route }) => {
  const { title, songs, id: playlistId } = route.params;
  const { allSongs } = useSelector((state) => state.root.firebase);
  const [favSongs, setFavSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [targetSong, setTargetSong] = useState();
  const [visible, setVisible] = useState(false);
  const uid = auth().currentUser.uid;
  const dispatch = useDispatch();
  const playbackState = usePlaybackState();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => back(),
    });
  }, [navigation]);

  useEffect(() => {
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('favSongs')
      .onSnapshot((snapshot) => {
        const favSongs = [];
        snapshot.docs.forEach((doc) => {
          favSongs.push(doc.data());
        });
        setFavSongs(favSongs);
      });
    return listener;
  }, []);

  const getPlaylistSongs = (songs) => {
    const playlistSongs = [];
    songs.map((playlistSong) => {
      allSongs.map((song) => {
        if (song.id === playlistSong) {
          playlistSongs.push(song);
          return;
        }
      });
    });
    setPlaylistSongs(playlistSongs);
  };

  useEffect(() => {
    getPlaylistSongs(songs);
  }, [allSongs]);

  useEffect(() => {
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

  const back = () => {
    return (
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => {
          resetPlay().then(() => {
            navigation.goBack();
          });
        }}>
        <Image source={backIcon} style={styles.back} />
      </TouchableOpacity>
    );
  };

  const resetPlay = async () => {
    try {
      await TrackPlayer.reset();
    } catch (error) {}
    dispatch(changeToMiniModal(false));
  };

  const initialPlay = async () => {
    try {
      dispatch(changeSong(playlistSongs[0]));
      dispatch(changeToMiniModal(true));
      await TrackPlayer.add(playlistSongs);
      dispatch(addPlayCount(playlistSongs[0].id));
      dispatch(addToRecentlyPlayed(playlistSongs[0]));
    } catch (error) {
      LOG('PLAY SONG', error);
    }
  };

  const playAllHandler = async () => {
    if (playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else if (playbackState === TrackPlayer.STATE_PLAYING) {
      await TrackPlayer.pause();
    } else {
      initialPlay();
    }
  };

  const addToFavSongs = (song) => {
    firestore()
      .collection('users')
      .doc(uid)
      .collection('favSongs')
      .doc(song.id)
      .set({ ...song })
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const removeFromFavSongs = (song) => {
    firestore()
      .collection('users')
      .doc(uid)
      .collection('favSongs')
      .doc(song.id)
      .delete()
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const renderEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={'#fff'} />
      </View>
    );
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const addToPlaylist = (song) => {
    setTargetSong(song);
    toggleOverlay();
  };

  const onBackdropPress = () => {
    const currentPlaylist = playlists.filter(
      (playlist) => playlist.id === playlistId,
    );
    getPlaylistSongs(currentPlaylist[0].songs);
    toggleOverlay();
  };

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        style={styles.linearGradient}
        colors={['#000', '#1C2745']}>
        <View style={styles.imageContainer}>
          <Image source={playlistDefault} style={styles.image} />
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.songsHeaderContainer}>
            <View style={styles.songsSubContainer}>
              <Text style={styles.songsText}>SONGS</Text>
              <Text style={[styles.songsText, { color: 'silver' }]}>
                {playlistSongs.length}
              </Text>
            </View>
            <View style={styles.playallButtonContainer}>
              <TouchableOpacity onPress={playAllHandler}>
                <Ionicon
                  name={
                    playbackState === TrackPlayer.STATE_PLAYING
                      ? 'md-pause'
                      : 'md-play'
                  }
                  size={26}
                  color="#fff"
                />
              </TouchableOpacity>
              <Text style={styles.playallButtonText}>Play All</Text>
            </View>
            <TouchableOpacity style={styles.optionsButtonContainer}>
              <EntypoIcon name="dots-three-horizontal" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={playlistSongs}
          showsVerticalScrollIndicator={false}
          keyExtractor={() => randomize('Aa0!', 10)}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => renderEmptyComponent()}
          renderItem={({ item }) => {
            let favSong = favSongs.some((song) => song.id == item.id);
            return (
              <View style={styles.itemMainContainer}>
                <View style={styles.itemSubContainer}>
                  <View>
                    <Text style={styles.songTitleText}>{item.title}</Text>
                    <Text style={styles.artistNameText}>{item.artist}</Text>
                  </View>
                  <View style={styles.favSongButtonContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        favSong ? removeFromFavSongs(item) : addToFavSongs(item)
                      }>
                      <EntypoIcon
                        name="heart"
                        color={favSong ? '#F5138E' : 'silver'}
                        size={25}
                      />
                    </TouchableOpacity>
                    <Text style={styles.songDurationText}>
                      {(item.duration / 60).toFixed(2)}
                    </Text>
                    <TouchableOpacity onPress={() => addToPlaylist(item)}>
                      <MaterialCommunityIcon
                        name="plus"
                        color="silver"
                        size={40}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <FullScreenOverlay
          visible={visible}
          playlists={playlists}
          targetSong={targetSong}
          toggleOverlay={toggleOverlay}
          onBackdropPress={onBackdropPress}
          navigation={navigation}
        />
      </LinearGradient>
    </View>
  );
};

export default Playlist;
