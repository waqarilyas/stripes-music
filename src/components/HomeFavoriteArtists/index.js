import React, { useEffect, useReducer } from 'react';
import { FlatList } from 'react-native';
import randomize from 'randomatic';

import SectionHeader from '../SectionHeader';
import { emptyArtist, artistIcon } from '../../../Assets/Icons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import reducer from '../../hooks/useReducer';
import ArtistsImage from '../ArtistsImage';
import EmptyCard from '../EmptyCard';

const initialState = {
  favoriteArtists: [],
};

const emptyCard = () => {
  return <EmptyCard text="No Favorite Artists." icon={emptyArtist} />;
};

const HomeFavoriteArtists = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Get Artists
    const uid = auth().currentUser.uid;
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((document) => {
        if (document.exists) {
          const favoriteArtists = document.data().favoriteArtists;
          dispatch({ favoriteArtists });
        }
      });
  }, []);

  return (
    <>
      <SectionHeader
        name="Favourite Artists"
        icon={artistIcon}
        onPress={() => navigation.navigate('FavouriteArtistSeeAll')}
      />
      <FlatList
        data={state.favoriteArtists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ height: '100%', width: '100%' }}
        horizontal
        ListEmptyComponent={emptyCard}
        renderItem={({ item: { name, avatar } }) => {
          return <ArtistsImage name={name} avatar={avatar} />;
        }}
      />
    </>
  );
};

export default HomeFavoriteArtists;
