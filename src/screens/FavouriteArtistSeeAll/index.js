import React, { useReducer, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import Block from '../../components/Block';
import reducer from '../../hooks/useReducer';
import { getQueriedCollections } from '../../utils/Firebase';
import randomize from 'randomatic';
import ArtistSeeAllScreenCard from '../../components/ArtistSeeAllScreenCard';

const initialState = {
  artists: [],
};

const FavouriteArtistSeeAll = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Get Artists
    const uid = auth().currentUser.uid;
    getQueriedCollections(
      'artists',
      'favoriteOf',
      'array-contains',
      uid,
      (collection) => {
        dispatch({ artists: collection });
      },
    );
  }, []);

  return (
    <Block>
      {state.artists.length ? (
        <FlatList
          data={state.artists}
          keyExtractor={() => randomize('Aa0!', 10)}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          renderItem={({
            item: { imgUrl, firstName, lastName, followerCount },
          }) => {
            return (
              <ArtistSeeAllScreenCard
                imgUrl={imgUrl}
                firstName={firstName}
                lastName={lastName}
                followers={followerCount}
              />
            );
          }}
        />
      ) : null}
    </Block>
  );
};

export default FavouriteArtistSeeAll;
