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
import Block from '../../components/Block';
import ArtistFollowCard from '../../components/ArtistFollowCard';
import NewsIconsCard from '../../components/NewsIconsCard';
import NewsCommentCard from '../../components/NewsCommentCard';
import SectionHeader from '../../components/SectionHeader';
import { newsComment } from '../../../Assets/Icons';
import RelatedNewsCard from '../../components/RelatedNewsCard';
import { getCollection, getDocument } from '../../utils/Firebase';
import NewsEmptyComments from '../../components/NewsEmptyComments';
import reducer from '../../hooks/useReducer';
// import { Add } from './utils';
// import Button from '../../components/Button';

const initialState = {
  news: {},
  comments: [],
  relatedNews: [],
};

const profilePic =
  'https://res.cloudinary.com/practicaldev/image/fetch/s--ef-WXsPf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/8050/Mm3V3467.jpg';

const NewsDetails = ({ route }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [commentText, setCommentText] = useState('');
  const { newsId } = route.params;

  useEffect(() => {
    getDocument('news', newsId, (document) => dispatch({ news: document }));
    getCollection('news', 5, (documents) =>
      dispatch({ relatedNews: documents }),
    );
    const listener = firestore()
      .collection('comments')
      .where('postId', '==', newsId)
      .onSnapshot((querySnapshot) => {
        let allComments = [];
        querySnapshot.forEach((doc) => {
          allComments.push(doc.data());
        });
        dispatch({ comments: allComments });
      });

    return () => listener;
  }, [newsId]);

  const handleSubmit = () => {
    if (commentText === '') {
      return;
    }

    firestore()
      .collection('comments')
      .add({
        comment: commentText,
        createdAt: firestore.FieldValue.serverTimestamp(),
        id: '',
        image: profilePic,
        postId: newsId,
        updatedAt: firestore.FieldValue.serverTimestamp(),
        userId: auth().currentUser.uid,
        username: 'Arslan Mushtaq',
      })
      .then((result) => {
        const documentId = result.id;
        result.update({
          id: documentId,
        });
        console.log('ID UPDATED!');
      })
      .catch((err) => console.log('---------- ERROR ----------', err));
  };

  return (
    <Block>
      <View style={styles.container}>
        {state.news ? (
          <>
            {/* <Button text="Add Comments" onPress={Add} /> */}
            <Image
              source={{ uri: state.news.imgUrl }}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.titleView}>
              <Text style={styles.title}>{state.news.title}</Text>
              {state.news.createdAt ? (
                <Text style={styles.date}>
                  {dayjs(state.news.createdAt.toDate()).format('DD MMMM, YYYY')}
                </Text>
              ) : null}
            </View>
            <Text style={styles.blog} adjustsFontSizeToFit>
              {state.news.description}
            </Text>

            <View style={styles.authorView}>
              <Text style={styles.postBy}>Post by </Text>
              <Text style={styles.authorName}>{state.news.author}</Text>
            </View>

            <ArtistFollowCard artistId={state.news.artistId} />
            <NewsIconsCard
              viewedBy={state.news.viewedBy}
              likedBy={state.news.likedBy}
              viewCount={state.news.viewCount}
              likeCount={state.news.likeCount}
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
                  renderItem={({
                    item: { id, imgUrl, title, description },
                  }) => {
                    if (id !== newsId) {
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
          </>
        ) : (
          <ActivityIndicator color="white" />
        )}
      </View>
    </Block>
  );
};

export default NewsDetails;
