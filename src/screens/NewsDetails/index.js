import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Image, Divider } from 'react-native-elements';
import randomize from 'randomatic';
import dayjs from 'dayjs';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import { LOG } from '../../utils/Constants';
import { thousandSeprator } from '../../utils/Helpers';
import Block from '../../components/Block';
import ArtistFollowCard from '../../components/ArtistFollowCard';
import NewsIconsCard from '../../components/NewsIconsCard';
import NewsCommentCard from '../../components/NewsCommentCard';
import SectionHeader from '../../components/SectionHeader';
import { newsComment } from '../../../Assets/Icons';
import RelatedNewsCard from '../../components/RelatedNewsCard';
import { getCollection } from '../../utils/Firebase';
import NewsEmptyComments from '../../components/NewsEmptyComments';
import reducer from '../../hooks/useReducer';
import { useSelector } from 'react-redux';

const initialState = {
  comments: [],
  relatedNews: [],
};

const profilePic =
  'https://res.cloudinary.com/practicaldev/image/fetch/s--ef-WXsPf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/8050/Mm3V3467.jpg';

const NewsDetails = () => {
  const { news } = useSelector((_state) => _state.root.firebase);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [commentText, setCommentText] = useState('');

  console.log('-------News ID-------', news);

  useEffect(() => {
    getCollection('news', 5, (documents) =>
      dispatch({ relatedNews: documents }),
    );
    const listener = firestore()
      .collection('comments')
      .where('postId', '==', news.id || '')
      .onSnapshot((querySnapshot) => {
        let allComments = [];
        querySnapshot.forEach((doc) => {
          allComments.push(doc.data());
        });
        dispatch({ comments: allComments });
      });

    return () => listener;
  }, []);

  const handleSubmit = () => {
    if (commentText === '') {
      return;
    }

    const data = {
      comment: commentText,
      createdAt: +new Date(),
      id: '',
      image: profilePic,
      postId: news.id,
      updatedAt: +new Date(),
      userId: auth().currentUser.uid,
      username: 'Arslan Mushtaq',
    };

    firestore()
      .collection('comments')
      .add(data)
      .then((result) => {
        const documentId = result.id;
        result.set({ id: documentId }, { merge: true });
        LOG('ID UPDATED!', 'DONE');
      })
      .catch((err) => LOG('ERROR', err));
  };

  return (
    <Block>
      <View style={styles.container}>
        {/* <Button text="Add Comments" onPress={Add} /> */}
        <Image
          source={{ uri: news.imgUrl }}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.titleView}>
          <Text style={styles.title}>{news.title}</Text>
          {news.createdAt ? (
            <Text style={styles.date}>
              {dayjs(news.createdAt).format('DD MMMM, YYYY')}
            </Text>
          ) : null}
        </View>
        <Text style={styles.blog} adjustsFontSizeToFit>
          {news.description}
        </Text>

        <View style={styles.authorView}>
          <Text style={styles.postBy}>Post by </Text>
          <Text style={styles.authorName}>{news.author}</Text>
        </View>

        <ArtistFollowCard artistId={news.artistId} />
        <NewsIconsCard
          viewedBy={news.viewedBy}
          likedBy={news.likedBy}
          viewCount={news.viewCount}
          likeCount={news.likeCount}
        />
        <View style={styles.commentButton}>
          <TextInput
            style={styles.commentButtonText}
            placeholder="Leave a comment"
            placeholderTextColor="gray"
            multiline
            onChangeText={(input) => setCommentText(input)}
          />
          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentSection}>
          {state.comments ? (
            <FlatList
              style={styles.commentListStyle}
              ListEmptyComponent={() => <NewsEmptyComments />}
              data={state.comments}
              ItemSeparatorComponent={() => (
                <Divider style={styles.commentDivider} />
              )}
              keyExtractor={() => randomize('Aa0!', 10)}
              renderItem={({
                item: { image, comment, username, createdAt },
              }) => {
                return (
                  <NewsCommentCard
                    image={image}
                    comment={comment}
                    username={username}
                    createdAt={createdAt && dayjs.unix(createdAt._seconds)}
                  />
                );
              }}
            />
          ) : (
            <ActivityIndicator color="black" />
          )}
        </View>

        <SectionHeader icon={newsComment} name="Related News" />

        <View style={styles.realtedNewsContainer}>
          {state.relatedNews ? (
            <FlatList
              data={state.relatedNews}
              keyExtractor={() => randomize('Aa0!', 10)}
              renderItem={({ item: { id, imgUrl, title, description } }) => {
                if (id !== news.id) {
                  return (
                    <RelatedNewsCard
                      image={imgUrl}
                      title={title}
                      description={description}
                    />
                  );
                } else {
                  return null;
                }
              }}
            />
          ) : (
            <ActivityIndicator color="white" />
          )}
        </View>
      </View>
    </Block>
  );
};

export default NewsDetails;
