import React, { useEffect, useReducer } from 'react';
import { View, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import randomize from 'randomatic';

import { getQueriedCollections } from '../../utils/Firebase';
import styles from './styles';
import reducer from '../../hooks/useReducer';
import SongCardListView from '../../components/SongCardListView';

const initialState = {
  recentlyPlayed: [],
};

const RecentPlayedSeeAll = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Get recently played songs
    const uid = auth().currentUser.uid;
    getQueriedCollections(
      'songs',
      'recentlyPlayedBy',
      'array-contains',
      uid,
      (documents) => {
        console.log(documents);
        dispatch({ recentlyPlayed: documents });
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      {state.recentlyPlayed.length ? (
        <FlatList
          data={state.recentlyPlayed}
          keyExtractor={() => randomize('Aa0!', 10)}
          renderItem={({ item: { title, artist, arts, duration } }) => {
            return (
              <SongCardListView
                title={title}
                artist={artist}
                arts={arts}
                duration={duration}
              />
            );
          }}
        />
      ) : null}
    </View>
  );
};

export default RecentPlayedSeeAll;
