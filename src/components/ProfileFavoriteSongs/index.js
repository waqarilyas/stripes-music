import React, { useEffect, useReducer } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import SectionHeader from '../SectionHeader';
import SongCard from '../SongCard';
import reducer from '../../hooks/useReducer';
import { mostPlayedHome, musicIcon } from '../../../Assets/Icons';
import EmptyProfileCard from '../EmptyProfileCard';

const initalState = {
  favSongs: [],
};

const ProfileFavoriteSongs = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((document) => {
        if (document.exists) {
          const favoriteSongs = document.data().favoriteSongs;
          dispatch({ favSongs: favoriteSongs });
        }
      });
  }, []);

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
        extraData={state.favSongs.length}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={{ width: '100%' }}
        ListEmptyComponent={
          <EmptyProfileCard
            icon={mostPlayedHome}
            text="No Favorite Songs"
            buttonTitle="SHOW SONG LIST"
            onPress={() => console.log('Navigate to Artist List')}
          />
        }
        renderItem={({ item: { title, artist, artwork } }) => {
          return <SongCard title={title} artist={artist} artwork={artwork} />;
        }}
      />
    </>
  );
};

export default ProfileFavoriteSongs;
