import React, { useEffect, useReducer } from 'react';
import { Text, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import styles from './styles';
import Block from '../../components/Block';
import ForYouPlaylistCard from '../../components/ForYouPlaylistCard';
import { getCollections } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import randomize from 'randomatic';

const initialState = {
  playlists: [],
};

const ForYouPlaylistSeeAll = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCollections('playlists', (collection) => {
      dispatch({ playlists: collection });
    });
  }, []);

  return (
    <Block>
      <Text style={styles.titleText}>
        A collection of playlists recommended just for you. We hope you like it!
      </Text>

      <FlatList
        data={state.playlists}
        keyExtractor={() => randomize('Aa10!', 10)}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item: { image, title, duration, author } }) => {
          console.log(image);
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
    </Block>
  );
};

export default ForYouPlaylistSeeAll;
