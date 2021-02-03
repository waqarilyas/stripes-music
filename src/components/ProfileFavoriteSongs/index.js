import React, { useEffect, useReducer } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import SectionHeader from '../SectionHeader';
import SongCard from '../SongCard';
import reducer from '../../hooks/useReducer';
import { mostPlayedHome, musicIcon } from '../../../Assets/Icons';
import EmptyProfileCard from '../EmptyProfileCard';
import TrackPlayer from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import {
  fullScreenChange,
  changeSong,
  setPlaylist,
} from '../../Redux/Reducers/audioSlice';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';
import { LOG } from '../../utils/Constants';

const initalState = {
  favSongs: [],
};

const ProfileFavoriteSongs = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const reduxDispatch = useDispatch();

  useEffect(() => {
    const uid = auth().currentUser?.uid;
    firestore()
      .collection('users')
      .doc(uid)
      .collection('favSongs')
      .onSnapshot((snapshot) => {
        const favSongs = [];
        snapshot.docs.forEach((doc) => {
          favSongs.push(doc.data());
        });
        dispatch({ favSongs });
      });
  }, []);

  const playSong = async (currentSong, playlist) => {
    const updatedPlaylist = playlist.filter(
      (song) => song.id !== currentSong.id,
    );
    try {
      reduxDispatch(changeSong(currentSong));
      await TrackPlayer.add([currentSong, ...updatedPlaylist]);
      reduxDispatch(fullScreenChange(true));
      reduxDispatch(setPlaylist(playlist));
      reduxDispatch(addPlayCount(currentSong.id));
      reduxDispatch(addToRecentlyPlayed(currentSong));
    } catch (error) {
      LOG('PLAY SONG', error);
    }
  };

  return (
    <>
      <SectionHeader
        name="Favorite Songs"
        icon={musicIcon}
        onPress={() => navigation.navigate('ProfileArtists')}
        isRequired={state.favSongs.length > 5}
      />
      <FlatList
        data={state.favSongs}
        keyExtractor={(item) => item.id}
        horizontal
        ListEmptyComponent={
          <EmptyProfileCard
            icon={mostPlayedHome}
            text="No Favorite Songs"
            buttonTitle="SHOW SONG LIST"
            onPress={() => navigation.navigate('ForYouAudioSeeAll')}
          />
        }
        renderItem={({ item, item: { title, artist, artwork } }) => {
          return (
            <TouchableOpacity onPress={() => playSong(item, state.favSongs)}>
              <SongCard title={title} artist={artist} artwork={artwork} />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default ProfileFavoriteSongs;
