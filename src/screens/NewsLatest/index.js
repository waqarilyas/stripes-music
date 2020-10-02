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
<<<<<<< HEAD
    <Block>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={() => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('NewsDetails')}>
              <NewsCard />
            </TouchableOpacity>
          );
        }}
      />
    </Block>
=======
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
              />
            );
          }}
        />
      )}
    </View>
>>>>>>> a1a0afbb6520a8c1667eefc11146061116d9809f
  );
};

export default NewsLatest;
