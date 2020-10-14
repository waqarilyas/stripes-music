import React, { useEffect, useReducer } from 'react';
import { FlatList } from 'react-native';
import randomize from 'randomatic';

import HomeTopSlider from '../HomeTopSlider';
import { getCollection } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';

const initialState = {
  banner: [],
};

const HomeBanner = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCollection('songs', 10, (collection) =>
      dispatch({ banner: collection }),
    );
  }, []);

  return (
    <FlatList
      data={state.banner}
      horizontal
      onScrollToIndexFailed={(info) => console.log(info)}
      keyExtractor={() => randomize('Aa0!', 10)}
      renderItem={({ item: { arts, title, description } }) => {
        return (
          <HomeTopSlider arts={arts} title={title} description={description} />
        );
      }}
    />
  );
};

export default HomeBanner;
