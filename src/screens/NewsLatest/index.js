import React, { useReducer, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity,DeviceEventEmitter } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getANews } from '../../Redux/Reducers/firebaseSlice';
import randomize from 'randomatic';
import styles from './styles';
import NewsCard from '../../components/NewsCard';
import { getOrderedCollections } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';


const initialState = { news: [] };

const NewsLatest = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchNews = useDispatch();

const getNews=()=>{
  getOrderedCollections('news', 'createdAt', 'desc', (collection) =>
  dispatch({ news: collection }),
);
}

  useEffect(() => {
    getNews();
  }, []);

  const handleNav = async (id, viewCount) => {
    const newsPath = firestore().collection('news').doc(id);
    newsPath.update({
      viewCount: viewCount + 1
    }).then(() => {
        getNews();
        DeviceEventEmitter.emit('update-yourself');
    }).catch((err) => {
      LOG('HANDLE VIEWCOUNT STATUS');
    });
    dispatchNews(getANews(id)).then(() => {
      navigation.navigate('NewsDetails');
    });
  };

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
              viewCount,
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
                  handleNav={() => handleNav(id, viewCount)}
                />
            );
          }}
        />
      )}
    </View>
  );
};

export default NewsLatest;
