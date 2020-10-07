import React, { useEffect, useReducer } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import randomize from 'randomatic';
import dayjs from 'dayjs';

import NewsCard from '../../components/NewsCard';
import styles from './styles';
import { getOrderedCollections } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';

const initialState = {
  news: [],
};

const NewsLatest = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getOrderedCollections('news', 'createdAt', 'desc', (collection) =>
      dispatch({ news: collection }),
    );
  }, []);

  return (
    <View style={styles.container}>
      {state.news.length > 0 && (
        <FlatList
          ListEmptyComponent={<ActivityIndicator />}
          data={state.news}
          style={styles.listSpacing}
          keyExtractor={() => randomize('Aa0!', 10)}
          renderItem={({
            item: {
              title,
              imgUrl,
              createdAt,
              description,
              likeCount,
              shareCount,
              commentCount,
              id,
            },
          }) => {
            const date = dayjs(createdAt.toDate()).format('DD MMMM, YYYY');
            return (
              <NewsCard
                title={title}
                image={imgUrl}
                date={date}
                description={description}
                likeCount={likeCount}
                shareCount={shareCount}
                commentCount={commentCount}
                nav={navigation}
                newsId={id}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default NewsLatest;
