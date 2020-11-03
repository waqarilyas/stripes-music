import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import SectionHeader from '../SectionHeader';
import { emptyArtist, favoriteArtistIcon } from '../../../Assets/Icons';
import ArtistsHorizontalCard from '../ArtistsHorizontalCard';
import EmptyCard from '../EmptyCard';

const emptyCard = () => {
  return <EmptyCard text="No Favorite Artists." icon={emptyArtist} />;
};

const HomeFavoriteArtists = ({ navigation }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('favArtists')
      .where('isFavorite', '==', true)
      .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.docs.forEach((document) => {
          if (document.exists) {
            let response = document.data();
            response.updatedAt = JSON.stringify(response.updatedAt);
            data.push(response);
          }
        });
        setList(data);
      });

    return () => listener;
  }, []);

  return (
    <>
      <SectionHeader
        name="Favourite Artists"
        icon={favoriteArtistIcon}
        onPress={() => navigation.navigate('FavouriteArtistSeeAll')}
      />
      <FlatList
        data={list}
        contentContainerStyle={list.length > 0 ? null : { flex: 1 }}
        ListEmptyComponent={emptyCard}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item: { name, avatar } }) => {
          return <ArtistsHorizontalCard name={name} avatar={avatar} />;
        }}
      />
    </>
  );
};

export default HomeFavoriteArtists;
