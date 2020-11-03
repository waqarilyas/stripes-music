import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import { removeFromFavorites } from '../../Redux/Reducers/firebaseSlice';
import { addToList } from '../../Redux/Reducers/helperSlice';
import ArtistSeeAllScreenCard from '../../components/ArtistSeeAllScreenCard';
import { useDispatch, useSelector } from 'react-redux';

const FavouriteArtistSeeAll = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.root.helpers);

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
        dispatch(addToList(data));
      });

    return () => listener;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.artistId}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item: { name, avatar, artistId } }) => {
          return (
            <ArtistSeeAllScreenCard
              avatar={avatar}
              name={name}
              onFavPress={() => dispatch(removeFromFavorites(artistId))}
            />
          );
        }}
      />
    </View>
  );
};

export default FavouriteArtistSeeAll;
