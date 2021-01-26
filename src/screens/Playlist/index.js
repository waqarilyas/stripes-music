import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { playlistDefault, eyeIcon } from '../../../Assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/dist/Ionicons';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import randomize from 'randomatic';

import styles from './styles';

const Playlist = ({ navigation, route }) => {
  const { image, title, viewCount, songCount, songs, isPrivate } = route.params;
  const { allSongs } = useSelector((state) => state.root.firebase);
  const [favSongs, setFavSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState();
  const uid = auth().currentUser.uid;

  console.log('allSongs', allSongs);

  useEffect(() => {
    const favSongs = [];
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('favSongs')
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          favSongs.push(doc.data());
        });
      });
    setFavSongs(favSongs);
    return () => listener();
  }, []);

  console.log('favSongs+', favSongs);

  useEffect(() => {
    const playlistSongs = [];
    songs.map((playlistSong) => {
      allSongs.map((song) => {
        if (song.id === playlistSong) {
          playlistSongs.push(song);
          return;
        }
      });
    });
    console.log('playListSongs', playlistSongs);
    setPlaylistSongs(playlistSongs);
  }, [allSongs]);

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
                {songCount}
              </Text>
            </View>
            <TouchableOpacity style={styles.playallButtonContainer}>
              <Ionicon name="md-play" size={26} color="#fff" />
              <Text style={styles.playallButtonText}>Play All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButtonContainer}>
              <EntypoIcon name="dots-three-horizontal" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={playlistSongs}
          showsVerticalScrollIndicator={false}
          keyExtractor={() => randomize('Aa0!', 10)}
          renderItem={({ item }) => {
            let favSong = favSongs.some((song) => song.id == item.id);
            return (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  paddingVertical: hp('2'),
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{ fontSize: 16, color: 'silver', paddingTop: 4 }}>
                      {item.artist}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
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
                    <Text
                      style={{ color: 'silver', paddingHorizontal: wp('3') }}>
                      {(item.duration / 60).toFixed(2)}
                    </Text>
                    <MaterialCommunityIcon
                      name="plus"
                      color="silver"
                      size={40}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </LinearGradient>
    </View>
  );
};

export default Playlist;
