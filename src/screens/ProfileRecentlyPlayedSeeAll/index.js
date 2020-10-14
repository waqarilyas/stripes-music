import React, { useEffect, useReducer } from 'react';
import { View, Text, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import randomize from 'randomatic';

import SongCardListView from '../../components/SongCardListView';
import styles from './styles';
import reducer from '../../hooks/useReducer';
import { getQueriedCollections } from '../../utils/Firebase';

const initialState = {
  recentlyPlayed: [],
};

const ProfileRecentlyPlayedSeeAll = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    getQueriedCollections(
      'songs',
      'recentlyPlayedBy',
      'array-contains',
      uid,
      (documents) => dispatch({ recentlyPlayed: documents }),
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Recently Played</Text>
        <Text style={styles.subtitle}>Songs Played Recently by you</Text>
      </View>
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

export default ProfileRecentlyPlayedSeeAll;
