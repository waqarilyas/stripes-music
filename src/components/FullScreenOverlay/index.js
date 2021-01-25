import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import randomize from 'randomatic';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { plusIcon, tick2 } from '../../../Assets/Icons';

const FullScreenOverlay = ({ visible, toggleOverlay, playlists }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [saving, setSaving] = useState(false);
  const uid = auth().currentUser.uid;

  const { currentSong } = useSelector((state) => state.root.audio);

  useEffect(() => {
    setSelectedPlaylist(playlists[0]);
  }, [playlists]);

  const addToPlaylist = () => {
    setSaving(true);
    console.log('selectedPlaylist', selectedPlaylist);
    firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .doc(selectedPlaylist?.id)
      .collection('songs')
      .doc(currentSong.id)
      .set(currentSong)
      .then((res) => {
        console.log('-----SUCCESS----', res);
        setSaving(false);
        toggleOverlay();
      })
      .catch(() => {
        setSaving(false);
      });
  };

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
          return (
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setSelectedPlaylist(item)}>
              <Text style={styles.checkboxInput}>{item.title}</Text>
              {item.id === selectedPlaylist?.id && <Image source={tick2} />}
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        disabled={saving}
        style={{
          backgroundColor: saving ? '#C2C2C2' : '#F5148E',
          padding: 10,
          width: '40%',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={addToPlaylist}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Done</Text>
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {saving && <ActivityIndicator size="small" color="navy" />}
        </View>
      </TouchableOpacity>
      <View style={styles.overlayBottom}>
        <Text
          style={styles.createPlaylistTitle}
          onPress={() => {
            global.nav.navigate('CreateNewPlaylist');
          }}>
          Create New Playlist
        </Text>
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
