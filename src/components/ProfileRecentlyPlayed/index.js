import React, { useEffect, useReducer } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import SectionHeader from '../SectionHeader';
import SongCardListView from '../SongCardListView';
import reducer from '../../hooks/useReducer';
import { playIcon, recentlyPlayedHome } from '../../../Assets/Icons';
import EmptyProfileCard from '../EmptyProfileCard';

const initialState = {
  history: [],
};

const ProfileRecentlyPlayed = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const uid = auth().currentUser?.uid;
    const userDoc = firestore().collection('users').doc(uid);

    let recentlyPlayedSongs = [];
    userDoc
      .collection('history')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((song) => {
          if (song.exists) {
            recentlyPlayedSongs.push(song.data());
          }
        });
        dispatch({ history: recentlyPlayedSongs });
      });
  }, []);

  return (
    <>
      <SectionHeader
        name="Recently Played"
        icon={playIcon}
        onPress={() => navigation.navigate('ProfileRecentlyPlayed')}
        isRequired={state.history.length > 5}
      />
      <FlatList
        data={state.history}
        ListEmptyComponent={
          <EmptyProfileCard
            text="NO MUSIC PLAYED YET"
            icon={recentlyPlayedHome}
            onPress={() => console.log('Navigate to Song List')}
            buttonTitle="SHOW SONG LIST"
          />
        }
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ width: '100%' }}
        renderItem={({ item, item: { title, artist, artwork, duration } }) => {
          return (
            <SongCardListView
              title={title}
              artist={artist}
              artwork={artwork}
              duration={duration}
            />
          );
        }}
      />
    </>
  );
};

export default ProfileRecentlyPlayed;
