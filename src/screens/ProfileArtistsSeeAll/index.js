import React, { useEffect, useReducer } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import randomize from 'randomatic';

import ArtistSeeAllScreenCard from '../../components/ArtistSeeAllScreenCard';
import styles from './styles';
import reducer from '../../hooks/useReducer';
import { getQueriedCollections } from '../../utils/Firebase';

const initialState = {
  artists: [],
};

const ProfileArtistsSeeAll = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    getQueriedCollections(
      'artists',
      'followedBy',
      'array-contains',
      uid,
      (documents) => dispatch({ artists: documents }),
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Favorite Artists</Text>
        <Text style={styles.subtitle}>
          All your Favorite Artists in a single place
        </Text>
      </View>
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
    </View>
  );
};

export default ProfileArtistsSeeAll;
