import React, { useEffect, useReducer } from 'react';
import { View, FlatList } from 'react-native';
import randomize from 'randomatic';

import styles from './styles';
import NewVideosCard from '../../components/NewVideosCard';
import { getOrderedCollections } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import { Divider } from 'react-native-paper';

const initialState = {
  videos: [],
};

const VideoPopularNow = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getOrderedCollections('videos', 'createdAt', 'desc', (collection) => {
      dispatch({ videos: collection });
    });
  }, []);

  return (
    <View style={styles.container}>
      {state.videos.length ? (
        <FlatList
          style={styles.list}
          data={state.videos}
          keyExtractor={() => randomize('Aa0!', 10)}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          renderItem={({
            item: { poster, title, artist, viewCount, duration },
          }) => {
            return (
              <NewVideosCard
                poster={poster}
                title={title}
                artist={artist}
                viewCount={viewCount}
                duration={duration}
              />
            );
          }}
        />
      ) : null}
    </View>
  );
};

export default VideoPopularNow;
