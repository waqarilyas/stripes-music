import React, { useEffect, useReducer } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import SongItem from '../../components/SongItem';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

import styles from './styles';
import { getOrderedCollections } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';

const initialState = {
  songs: [],
  favoriteSongs: [],
};

const MostPlayedSeeAll = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mostPlayedSongs } = useSelector((state) => state.root.firebase);

  useEffect(() => {
    getOrderedCollections('songs', 'playCount', 'desc', (collection) =>
      dispatch({ songs: collection }),
    );

    const uid = auth().currentUser.uid;
    const userDoc = firestore().collection('users').doc(uid);
    userDoc.get().then((document) => {
      if (document.exists) {
        const favoriteSongsList = document.data().favoriteSongs;
        dispatch({ favoriteSongs: favoriteSongsList });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Most Played</Text>
        <Text style={styles.subtitle}>List of all Most Played Songs</Text>
      </View>
      <FlatList
        data={mostPlayedSongs}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, artist, artwork } }) => {
          // const isFavorite = state.favoriteSongs.includes(id);
          return (
            <SongItem id={id} title={title} author={artist} image={artwork} />
          );
        }}
      />
    </View>
  );
};

export default MostPlayedSeeAll;
