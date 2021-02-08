import React, { useEffect, useReducer } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import SectionHeader from '../SectionHeader';
import ArtistsHorizontalCard from '../ArtistsHorizontalCard';
import reducer from '../../hooks/useReducer';
import { emptyArtist, iconsPlaylist } from '../../../Assets/Icons';
import EmptyProfileCard from '../EmptyProfileCard';
import {
  getArtist,
  getArtistNews,
  getArtistPlaylists,
  getArtistPopularSongs,
} from '../../Redux/Reducers/firebaseSlice';
import { getArtistId } from '../../Redux/Reducers/idsSlice';

const initalState = {
  favArtists: [],
};

const ProfileArtists = ({ navigation }) => {
  const [state, localDispatch] = useReducer(reducer, initalState);
  const dispatch = useDispatch();

  useEffect(() => {
    const uid = auth().currentUser?.uid;
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('favArtists')
      .where('isFollowing', '==', true)
      .onSnapshot((snapshot) => {
        const favArtists = [];
        snapshot.forEach((doc) => {
          favArtists.push(doc.data());
        });
        localDispatch({ favArtists: favArtists });
      });

    return () => listener();
  }, []);

  const handleArtist = (id) => {

    try {
      dispatch(getArtist(id));
      dispatch(getArtistId(id));
      dispatch(getArtistNews(id));
      dispatch(getArtistPopularSongs(id));
      dispatch(getArtistPlaylists(id));
      navigation.navigate('Artist');
    } catch (err) {
      console.log('dispatch error', err);
    }
  };

  return (
    <>
      <SectionHeader
        name="Favorite Artists"
        icon={iconsPlaylist}
        // onPress={() => navigation.navigate('ProfileArtists')}
        isRequired={false}
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
            onPress={() => navigation.navigate('ArtistsSeeAll')}
          />
        }
        renderItem={({ item, item: { avatar, name } }) => {
          return (
            <TouchableOpacity onPress={() => handleArtist(item.artistId)}>
              <ArtistsHorizontalCard name={name} avatar={avatar} />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default ProfileArtists;
