import React, { useReducer, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import Block from '../../components/Block';
import reducer from '../../hooks/useReducer';
import ArtistSeeAllScreenCard from '../../components/ArtistSeeAllScreenCard';

const initialState = {
  favArtists: [],
};

const FavouriteArtistSeeAll = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const uid = auth().currentUser.uid;

  useEffect(() => {
    // Get Artists
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((document) => {
        if (document.exists) {
          const favoriteArtists = document.data().favoriteArtists;
          console.log(favoriteArtists);
          dispatch({ favArtists: favoriteArtists });
        }
      });
  }, [uid]);

  const handleFav = async (item, index) => {
    let temp = state.favArtists;
    temp.splice(index, 1);
    dispatch({ favArtists: [...temp] });
    console.log(temp);
    firestore()
      .collection('users')
      .doc(uid)
      .set(
        {
          favoriteArtists: firestore.FieldValue.arrayRemove(item),
        },
        { merge: true },
      );
  };

  return (
    <Block>
      <FlatList
        data={[...state.favArtists]}
        // extraData={state.favArtists.length}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item, index }) => {
          return (
            <ArtistSeeAllScreenCard
              avatar={item.avatar}
              name={item.name}
              onFavPress={() => handleFav(item, index)}
            />
          );
        }}
      />
    </Block>
  );
};

export default FavouriteArtistSeeAll;
