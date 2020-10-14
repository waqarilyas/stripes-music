import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import randomize from 'randomatic';
import React, { useEffect, useReducer } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';

import { recentlyPlayedHome, playIcon } from '../../../Assets/Icons';
import reducer from '../../hooks/useReducer';
import SectionHeader from '../SectionHeader';
import SongCardListView from '../SongCardListView';
import styles from './styles';
import EmptyCard from '../EmptyCard';

const initialState = {
  history: [],
  favoriteSongs: [],
};

const emptyCard = () => {
  return (
    <EmptyCard text="No Recently Played Songs" icon={recentlyPlayedHome} />
  );
};

const HomeRecentPlayed = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Get recently played songs
    const uid = auth().currentUser.uid;
    const userDoc = firestore().collection('users').doc(uid);

    let recentlyPlayedSongs = [];
    userDoc
      .collection('history')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((song) => {
          if (song.exists) {
            recentlyPlayedSongs.push(song.data());
          }
        });
        dispatch({ history: recentlyPlayedSongs });
      });

    userDoc.get().then((user) => {
      if (user.exists) {
        const favoriteSongsList = user.data().favoriteSongs;
        dispatch({ favoriteSongs: favoriteSongsList });
      }
    });
  }, []);

  return (
    <ScrollView>
      <FlatList
        ListHeaderComponent={
          <SectionHeader
            name="Recent Played"
            icon={playIcon}
            onPress={() => navigation.navigate('RecentPlayedSeeAll')}
          />
        }
        data={state.history}
        keyExtractor={() => randomize('Aa0!', 10)}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        ListEmptyComponent={emptyCard}
        renderItem={({ item: { id, title, artist, artwork, duration } }) => {
          const isFavorite = state.favoriteSongs.includes(id);
          return (
            <SongCardListView
              title={title}
              artist={artist}
              arts={artwork}
              duration={duration}
              id={id}
              isFavorite={isFavorite}
            />
          );
        }}
      />
    </ScrollView>
  );
};

export default HomeRecentPlayed;
