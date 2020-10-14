import React, { useEffect, useReducer } from 'react';
import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-elements';
import SongItem from '../../components/SongItem';

import styles from './styles';
import { getOrderedCollections } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import randomize from 'randomatic';

const initialState = {
  songs: [],
};

const MostPlayedSeeAll = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getOrderedCollections('songs', 'likesCount', 'desc', (collection) =>
      dispatch({ songs: collection }),
    );
  }, []);

  return (
    <View style={styles.container}>
      {state.songs.length > 0 && (
        <FlatList
          data={state.songs}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          keyExtractor={() => randomize('Aa!0', 10)}
          renderItem={({ item: { title, artist, arts } }) => (
            <SongItem title={title} author={artist} arts={arts} />
          )}
        />
      )}
    </View>
  );
};

export default MostPlayedSeeAll;
