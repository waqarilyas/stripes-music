import React, { useReducer, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import randomize from 'randomatic';
import styles from './styles';
import NewsCard from '../../components/NewsCard';
import { getOrderedCollections } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import dayjs from 'dayjs';

const initialState = { news: [] };

const NewsTrending = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getOrderedCollections('news', 'viewCount', 'desc', (collection) =>
      dispatch({ news: collection }),
    );
  }, []);

  return (
    <View style={styles.container}>
      {state.news.length > 0 && (
        <FlatList
          ListEmptyComponent={<ActivityIndicator />}
          data={state.news}
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
            const date = dayjs(createdAt.seconds).format('DD MMMM, YYYY');
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

export default NewsTrending;
