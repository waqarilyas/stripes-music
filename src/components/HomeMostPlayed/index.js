import React, { useEffect, useReducer } from 'react';
import { FlatList } from 'react-native';
import randomize from 'randomatic';

import SectionHeader from '../SectionHeader';
import { musicIcon, mostPlayedHome } from '../../../Assets/Icons';
import { getOrderedCollection } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import SongCard from '../SongCard';
import EmptyCard from '../EmptyCard';

const initialState = {
  songs: [],
};

const emptyCard = () => {
  return <EmptyCard text="No Songs Played" icon={mostPlayedHome} />;
};

const HomeMostPlayed = ({ navigation }) => {
  useEffect(() => {
    getOrderedCollection('songs', 'playCount', 'desc', 10, (collection) =>
      dispatch({ songs: collection }),
    );
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <SectionHeader
        name="Most Played"
        icon={musicIcon}
        onPress={() => navigation.navigate('MostPlayedSeeAll')}
      />

      <FlatList
        data={state.songs}
        horizontal
        contentContainerStyle={{ height: '100%', width: '100%' }}
        ListEmptyComponent={emptyCard}
        keyExtractor={() => randomize('Aa0!', 10)}
        renderItem={({ item: { title, artist, arts } }) => {
          return <SongCard title={title} artist={artist} arts={arts} />;
        }}
      />
    </>
  );
};

export default HomeMostPlayed;
