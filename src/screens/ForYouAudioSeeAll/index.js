import React, { useEffect, useReducer } from 'react';
import { Text, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import styles from './styles';
import Block from '../../components/Block';
import ForYouAudioCard from '../../components/ForYouAudioCard';
import { getCollections } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import randomize from 'randomatic';

const initialState = {
  songs: [],
};

const ForYouAudioSeeAll = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCollections('songs', (collection) => {
      dispatch({ songs: collection });
    });
  }, []);

  return (
    <Block>
      <Text style={styles.titleText}>
        A collection of music recommended just for you. We hope you like it!
      </Text>

      <FlatList
        data={state.songs}
        keyExtractor={() => randomize('Aa10!', 10)}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item: { arts, title, artist } }) => {
          return (
            <ForYouAudioCard arts={arts[0]} title={title} artist={artist} />
          );
        }}
      />
    </Block>
  );
};

export default ForYouAudioSeeAll;
