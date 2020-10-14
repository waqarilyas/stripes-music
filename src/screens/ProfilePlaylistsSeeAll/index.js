import React, { useEffect, useReducer } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import randomize from 'randomatic';

import ForYouPlaylistCard from '../../components/ForYouPlaylistCard';
import styles from './styles';
import reducer from '../../hooks/useReducer';
import { getUserSubCollections } from '../../utils/Firebase';

const initialState = {
  playlists: [],
};

const ProfilePlaylistSeeAll = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    getUserSubCollections(uid, 'playlists', (documents) =>
      dispatch({ playlists: documents }),
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>My Playlists</Text>
        <Text style={styles.subtitle}>A collection of your own playlists</Text>
      </View>
      {state.playlists.length ? (
        <FlatList
          data={state.playlists}
          keyExtractor={() => randomize('Aa0!', 10)}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          renderItem={({ item: { duration, title, author, image } }) => {
            return (
              <ForYouPlaylistCard
                image={image}
                title={title}
                duration={duration}
                author={author}
              />
            );
          }}
        />
      ) : null}
    </View>
  );
};

export default ProfilePlaylistSeeAll;
