import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EmptyArtistProfileCard from '../../components/EmptyArtistProfileCard';
import TrackPlayer from 'react-native-track-player';
import { changeSong, fullScreenChange } from '../../Redux/Reducers/audioSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import { mostPlayedHome } from '../../../Assets/Icons';
import SongItem from '../../components/SongItem';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';

const ArtistPopular = () => {
  const dispatch = useDispatch();
  const [favSongs, setFavSongs] = useState();
  const uid = auth().currentUser?.uid;
  const { artistPopularSongs } = useSelector((state) => state.root.firebase);

  useEffect(() => {
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('favSongs')
      .onSnapshot((snapshot) => {
        const favSongs = [];
        snapshot.docs.forEach((doc) => {
          console.log('doc', doc);
          favSongs.push(doc.data());
        });
        console.log('favSongs', favSongs);
        setFavSongs(favSongs);
      });
    return listener;
  }, []);

  const playSong = async (currentSong) => {
    try {
      dispatch(changeSong(currentSong));
      dispatch(fullScreenChange(true));
      await TrackPlayer.add(artistPopularSongs);
      dispatch(addPlayCount(currentSong.id));
      dispatch(addToRecentlyPlayed(currentSong));
    } catch (error) {
      console.log('PLAY SONG', error);
    }
  };

  return (
    <View style={styles.container}>
      {artistPopularSongs && favSongs && (
        <FlatList
          data={artistPopularSongs}
          bounces={false}
          contentContainerStyle={
            artistPopularSongs.length > 0 ? null : { flex: 1 }
          }
          keyExtractor={(item) => `${item.id}`}
          ListEmptyComponent={
            <EmptyArtistProfileCard
              text="NO POPULAR SONGS BY THIS ARTIST YET!"
              icon={mostPlayedHome}
            />
          }
          renderItem={({ item }) => {
            return <SongItem song={item} playlist={artistPopularSongs} />;
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ArtistPopular;
