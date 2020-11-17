import React from 'react';
import dayjs from 'dayjs';
import randomize from 'randomatic';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { getANews } from '../../Redux/Reducers/firebaseSlice';
import NewsCard from '../../components/NewsCard';
import styles from './styles';
import { LOG } from '../../utils/Constants';

const NewsLatest = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allNews } = useSelector((state) => state.root.firebase);
  LOG('RESPONSE', allNews);

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={<ActivityIndicator />}
        data={allNews}
        style={styles.listSpacing}
        keyExtractor={(item) => item.id}
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
          const date = dayjs(createdAt).format('DD MMMM, YYYY');

          console.log('------DATE------', date);
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(getANews(id));
                navigation.navigate('NewsDetails');
              }}>
              <NewsCard
                title={title}
                image={imgUrl}
                date={date}
                description={description}
                likeCount={likeCount}
                shareCount={shareCount}
                commentCount={commentCount}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default NewsLatest;
