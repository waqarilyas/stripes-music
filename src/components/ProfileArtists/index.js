import React, { useEffect, useReducer } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import SectionHeader from '../SectionHeader';
import ArtistsHorizontalCard from '../ArtistsHorizontalCard';
import reducer from '../../hooks/useReducer';
import { emptyArtist, iconsPlaylist } from '../../../Assets/Icons';
import EmptyProfileCard from '../EmptyProfileCard';

const initalState = {
  favArtists: [],
};

const ProfileArtists = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((document) => {
        if (document.exists) {
          const favoriteArtists = document.data().favoriteArtists;
          dispatch({ favArtists: favoriteArtists });
        }
      });
  }, []);

  return (
    <>
      <SectionHeader
        name="Favorite Artists"
        icon={iconsPlaylist}
        onPress={() => navigation.navigate('ProfileArtists')}
        // isRequired={state.favArtists.length > 5}
      />
      <FlatList
        data={state.favArtists}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={{ width: '100%' }}
        ListEmptyComponent={
          <EmptyProfileCard
            icon={emptyArtist}
            text="No Favorite Artists"
            buttonTitle="SHOW ARTIST LIST"
            onPress={() => console.log('Navigate to Artist List')}
          />
        }
        renderItem={({ item: { image, name } }) => {
          return <ArtistsHorizontalCard name={name} image={image} />;
        }}
      />
    </>
  );
};

export default ProfileArtists;
