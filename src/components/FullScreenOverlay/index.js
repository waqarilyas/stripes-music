import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { Text, FlatList, View, StyleSheet, Image } from 'react-native';
import { CheckBox, Divider, Overlay } from 'react-native-elements';
import TrackPlayer from 'react-native-track-player';
import randomize from 'randomatic';
import { useDispatch, useSelector } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';

import {
  plusIcon,
  tick,
  tick2,
  tickIcon,
  cancelIcon,
} from '../../../Assets/Icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addToPlaylist } from '../../Redux/Reducers/firebaseSlice';

const FullScreenOverlay = ({
  visible,
  toggleOverlay,
  playlists,
}) => {
  const [checked, setChecked] = useState(false);
  const uid = auth().currentUser.uid;

  const { currentSong } = useSelector((state) => state.root.audio);


  const getCurrentTrack = async () => {
    const track = await TrackPlayer.getCurrentTrack();
    console.log('----Current track----', track);
  };
  const addToPlaylist = (playlistId) => {
    console.log('------Add to playlist--------');
    firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .doc(playlistId)
      .collection('songs')
      .doc(currentSong.id)
      .set(currentSong)
      .then((res) => {
        console.log('-----SUCCESS----', res);
      });
  };
  const removeFromPlaylist = (playlistId) => {
    console.log('------remove from playlist--------');

    firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .doc(playlistId)
      .collection('songs')
      .doc(currentSong.id)
      .delete()
      .then((res) => {
        console.log(res, 'remove successfull');
      });
  };

  const handleClick = (playlistId) => {
    checked ? removeFromPlaylist(playlistId) : addToPlaylist(playlistId);
  };

  useEffect(() => {
    getCurrentTrack();
  }, []);

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.overlay}
      ListEmptyComponent={() => <ActivityIndicator color="black" />}
      backdropStyle={{ backgroundColor: 'transparent' }}>
      <Text style={styles.overlayHeader}>Add To Playlist</Text>

      <FlatList
        data={playlists}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => randomize('Aa0!', 10)}
        renderItem={({ item }) => {
          console.log('-------ITEM------', item);
          return (
            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxInput}>{item.title}</Text>
              <TouchableOpacity
                style={styles.tickIconContainer}
                onPress={() => {
                  handleClick(item.id);
                  setChecked(!checked);
                }}>
                <Image
                  source={checked ? cancelIcon : tick2}
                  style={styles.tickIcon}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={styles.overlayBottom}>
        <Text style={styles.createPlaylistTitle} onPress={() => {
          global.nav.navigate("CreateNewPlaylist")
        }}>Create New Playlist</Text>
        <Image source={plusIcon} style={styles.createIcon} />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#212121',
    height: '50%',
    width: '80%',
    borderRadius: hp('2'),
    paddingHorizontal: hp('2'),
  },
  checkboxContainer: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    paddingVertical: hp('1'),
    marginBottom: hp('1'),
    paddingLeft: hp('1'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: hp('1'),
  },
  checkboxInput: {
    fontSize: hp('2'),
    color: 'white',
    // : hp('10'),
    flex: 2,
  },
  tickIconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tickIcon: {
    tintColor: 'white',
    resizeMode: 'contain',
    height: hp('2'),
    width: hp('2'),
  },
  overlayHeader: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('3'),
    marginVertical: hp('2'),
  },
  createPlaylistTitle: {
    color: 'white',
    fontSize: hp('2'),
  },
  createIcon: {
    resizeMode: 'contain',
    height: hp('2'),
    width: hp('2'),
  },
  overlayBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: hp('2'),
  },
});

export default FullScreenOverlay;
