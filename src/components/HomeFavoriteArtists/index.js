import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { getArtistId } from '../../Redux/Reducers/idsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArtist,
  getArtistNews,
  getArtistPlaylists,
  getArtistPopularSongs,
} from '../../Redux/Reducers/firebaseSlice';

import SectionHeader from '../SectionHeader';
import { emptyArtist, favoriteArtistIcon } from '../../../Assets/Icons';
import ArtistsHorizontalCard from '../ArtistsHorizontalCard';
import EmptyCard from '../EmptyCard';

const emptyCard = () => {
  return <EmptyCard text="No Favorite Artists." icon={emptyArtist} />;
};

const HomeFavoriteArtists = ({ navigation }) => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const uid = auth().currentUser?.uid;
    let listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('favArtists')
      .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.docs.forEach((document) => {
          if (document.exists && document.data().isFollowing) {

            data.push(document.data());
          }
        });
        setList(data);
      });

    return listener;
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
        icon={favoriteArtistIcon}
        onPress={() => navigation.navigate('FavouriteArtistSeeAll')}
      />
      {list && (
        <FlatList
          data={list}
          contentContainerStyle={list.length > 0 ? null : { flex: 1 }}
          ListEmptyComponent={emptyCard}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          renderItem={({ item, item: { name, avatar } }) => {

            return (
              <TouchableOpacity onPress={() => handleArtist(item.artistId)}>
                <ArtistsHorizontalCard name={name} avatar={avatar} />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </>
  );
};

export default HomeFavoriteArtists;
