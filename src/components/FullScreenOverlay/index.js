import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import randomize from 'randomatic';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Modal,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Overlay } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { plusIcon } from '../../../Assets/Icons';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';

const FullScreenOverlay = ({
  visible,
  playlists,
  targetSong,
  toggleOverlay,
  onBackdropPress,
  navigation,
  switchMode,
}) => {
  const [added, setAdded] = useState(false);
  const [removed, setRemoved] = useState(false);
  const dispatch = useDispatch();
  const uid = auth().currentUser?.uid;

  useEffect(() => {
    if (added) {
      setTimeout(() => {
        setAdded(false);
      }, 1000);
    }
    if (removed) {
      setTimeout(() => {
        setRemoved(false);
      }, 1000);
    }
  }, [added, removed]);

  const addToPlaylist = (playlistId) => {
    firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .doc(playlistId)
      .update({
        songs: firestore.FieldValue.arrayUnion(targetSong?.id),
      })
      .then((res) => {
        setAdded(true);
        console.log('-----SUCCESS----', res);
      })
      .catch(() => {});
  };

  const removeFromPlaylist = (playlistId) => {
    firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .doc(playlistId)
      .update({
        songs: firestore.FieldValue.arrayRemove(targetSong?.id),
      })
      .then((res) => {
        setRemoved(true);
      })
      .catch(() => {});
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={styles.overlay}
      ListEmptyComponent={() => <ActivityIndicator color="black" />}
      backdropStyle={{ backgroundColor: 'transparent' }}>
      <Text style={styles.overlayHeader}>Add To Playlist</Text>

      <FlatList
        data={playlists}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => randomize('Aa0!', 10)}
        renderItem={({ item }) => {
          const addedToPlaylist = item.songs?.some(
            (song) => song === targetSong?.id,
          );
          return (
            <TouchableOpacity
              style={[
                styles.checkboxContainer,
                {
                  backgroundColor: addedToPlaylist ? '#006600' : 'gray',
                },
              ]}
              onPress={() => {
                addedToPlaylist
                  ? removeFromPlaylist(item.id)
                  : addToPlaylist(item.id);
              }}>
              <Text style={styles.checkboxInput}>{item.title}</Text>
              {addedToPlaylist && (
                <FeatherIcon name="check" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          );
        }}
      />
      <Modal
        visible={added || removed}
        transparent={true}
        animationType={'fade'}>
        <View style={styles.infoMainContainer}>
          <View style={styles.infoSubContainer}>
            {added && <Text style={styles.infoText}>Added to</Text>}
            {removed && <Text style={styles.infoText}>Removed from</Text>}
            <Text style={[styles.infoText, { fontSize: 22 }]}>Playlist</Text>
            <View
              style={[
                styles.infoIconContainer,
                { backgroundColor: added ? 'green' : 'red' },
              ]}>
              <FeatherIcon
                name={added ? 'check' : 'x'}
                size={25}
                color="#fff"
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.overlayBottom}>
        <Text
          style={styles.createPlaylistTitle}
          onPress={() => {
            if (!navigation) {
              switchMode('miniplayer');
              global.nav.navigate('CreateNewPlaylist', {
                switchMode,
              });
            } else {
              navigation.navigate('CreateNewPlaylist');
            }
            toggleOverlay();
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
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: hp('2'),
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
    color: 'black',
    // : hp('10'),
    flex: 2,
  },
  infoMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSubContainer: {
    justifyContent: 'center',
    backgroundColor: 'silver',
    alignItems: 'center',
    height: '20%',
    borderRadius: 30,
    width: '50%',
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
  },
  infoIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
