import React, { useEffect, useReducer } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import styles from './styles';
import { getOrderedCollections } from '../../utils/Firebase';
import ForYouPlaylistCard from '../../components/ForYouPlaylistCard';
import reducer from '../../hooks/useReducer';

const initialState = {
  playlists: [],
};

const MusicScreenAllPlayLists = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getOrderedCollections('playlists', 'viewCount', 'desc', (collection) =>
      dispatch({ playlists: collection }),
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>The Best Playlists</Text>
        <Text style={styles.subtitle}>
          A collection of playlists recommended just for you. We hope you like
          it!
        </Text>
      </View>
      {state.playlists.length ? (
        <FlatList
          data={state.playlists}
          keyExtractor={(item) => item}
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

export default MusicScreenAllPlayLists;
