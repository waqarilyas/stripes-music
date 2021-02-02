import auth from '@react-native-firebase/auth';
import TrackPlayer from 'react-native-track-player';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Avatar, CheckBox, Overlay } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';

import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  heartGrayIcon,
  playlist,
  plusIcon,
  queueIcon,
  tickIcon,
} from '../../../Assets/Icons';
import { useDispatch } from 'react-redux';
import {
  fullScreenChange,
  setPlaylist,
  changeSong,
} from '../../Redux/Reducers/audioSlice';
import {
  addAlbumPlayCount,
  addPlayCount,
} from '../../Redux/Reducers/firebaseSlice';

import SongCardListView from '../../components/SongCardListView';

const SongItem = ({ song, playlist }) => {
  const { title, artist, artwork, id, duration } = song;
  const [visible, setVisible] = useState(false);
  const [isFavourite, setIsFavourite] = useState();
  const [addToQueue, setAddToQueue] = useState(false);
  const [checked, setChecked] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const dispatch = useDispatch();
  const uid = auth().currentUser.uid;

  useEffect(() => {
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('favSongs')
      .where('isFavourite', '==', true)
      .onSnapshot((snapshot) => {
        let isFavourite = false;
        snapshot.forEach((doc) => {
          if (doc.data().id == song.id) {
            isFavourite = true;
          }
        });
        setIsFavourite(isFavourite);
      });
    return () => listener();
  });

  const addToFavSongs = () => {
    firestore()
      .collection('users')
      .doc(uid)
      .collection('favSongs')
      .doc(id)
      .set({ ...song, isFavourite: true })
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const removeFromFavSongs = (id) => {
    firestore()
      .collection('users')
      .doc(uid)
      .collection('favSongs')
      .doc(id)
      .update({ isFavourite: false })
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const playSong = async (currentSong, playlist) => {
    try {
      dispatch(changeSong(currentSong));
      await TrackPlayer.add(playlist);
      dispatch(fullScreenChange(true));
      dispatch(addPlayCount(currentSong.id));
      dispatch(setPlaylist(playlist));
      dispatch(addToRecentlyPlayed(currentSong));
    } catch (error) {
      console.log('PLAY SONG', error);
    }
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      {visible && (
        <Overlay
          isVisible={visible}
          ListEmptyComponent={() => <ActivityIndicator color="black" />}
          onBackdropPress={toggleOverlay}
          overlayStyle={
            playlistOpen ? styles.playlistOpenOverlay : styles.overlay
          }>
          <SongCardListView
            title={title}
            artist={artist}
            artwork={artwork}
            duration={duration}
          />

          <View style={styles.overlayBottom}>
            <TouchableOpacity
              onPress={() => setPlaylistOpen(!playlistOpen)}
              style={styles.overLayBottomContainer}>
              <>
                <Avatar size={40} rounded source={playlist} />
                <Text style={styles.overlayTitle}>Add To Playlist</Text>
              </>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.overLayBottomContainer}
              onPress={() => setAddToQueue(!addToQueue)}>
              {addToQueue ? (
                <Image source={tickIcon} style={styles.tick} />
              ) : (
                <>
                  <Avatar size={40} rounded source={queueIcon} />
                  <Text style={styles.overlayTitle}>Add To Queue</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          {playlistOpen && (
            <View
              style={{
                backgroundColor: '#373737',
                position: 'relative',
                flex: 3,
              }}>
              <ScrollView>
                <Text style={styles.overlayHeader}>Your playlists</Text>
                {/* <FlatList
              data="Title"
              keyExtractor={() => randomize('Aa0!', 10)}
              renderItem={({ item }) => {
              return ( */}

                <CheckBox
                  title="Title"
                  iconRight
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxInput}
                  iconType="material"
                  checkedIcon="clear"
                  uncheckedIcon="add"
                  checkedColor="red"
                  checked={checked}
                  onPress={() => {
                    setChecked(!checked);
                    // onAddToPlaylist(item.id, selectedSong);
                  }}
                />
              </ScrollView>
              {/* );
              }}
            /> */}
            </View>
          )}
        </Overlay>
      )}

      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <TouchableOpacity
            style={styles.subContainerLeft}
            onPress={() => playSong(song, playlist)}>
            <Image
              source={artwork ? { uri: artwork } : null}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <Text style={styles.author}>{artist}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => toggleOverlay()}>
            <Image source={plusIcon} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.durationText}>{(duration / 60).toFixed(3)}</Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              isFavourite ? removeFromFavSongs(id) : addToFavSongs(id);
            }}>
            <Image
              source={heartGrayIcon}
              style={isFavourite ? styles.favoriteIcon : styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const icon = {
  resizeMode: 'contain',
  tintColor: 'gray',
  width: 18,
  height: 18,
  paddingHorizontal: 20,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: wp('100'),
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  textContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  containerLeft: {
    flex: 3,
    width: '100%',
  },
  subContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    color: 'silver',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  author: {
    color: 'gray',
    marginTop: 2,
    fontSize: 12,
  },
  icon: {
    ...icon,
  },
  favoriteIcon: {
    ...icon,
    tintColor: '#e81093',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 12,
    resizeMode: 'cover',
    marginRight: 12,
  },
  add: {
    resizeMode: 'contain',
    tintColor: 'gray',
    height: 22,
    width: 22,
    alignSelf: 'center',
  },
  overlay: {
    width: '90%',
    backgroundColor: '#212121',
    flex: 0.4,
  },
  playlistOpenOverlay: {
    width: '90%',
    backgroundColor: '#212121',
    flex: 0.8,
  },
  overlayBottom: {
    flex: 1,
    flexDirection: 'row',
  },
  overLayBottomContainer: {
    backgroundColor: '#212121',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(12),
    textAlign: 'center',
    marginTop: RFValue(10),
  },
  tick: {
    resizeMode: 'contain',
    height: RFValue(60),
    width: RFValue(60),
  },
  overlayTop: {
    flex: 1,
  },
  overlayHeader: {
    fontSize: RFValue(18),
    alignSelf: 'center',
    paddingVertical: RFValue(10),
    color: 'white',
  },
  checkboxContainer: {
    backgroundColor: 'black',
    borderWidth: 0,
    paddingVertical: RFValue(10),
  },
  checkboxInput: {
    fontSize: RFValue(16),
    color: 'white',
    marginRight: '70%',
  },
});

export default SongItem;
