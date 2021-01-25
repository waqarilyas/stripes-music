import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import randomize from 'randomatic';
import React, { useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { Divider, Image } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { newsComment } from '../../../Assets/Icons';
import ArtistFollowCard from '../../components/ArtistFollowCard';
import Block from '../../components/Block';
import NewsCommentCard from '../../components/NewsCommentCard';
import NewsEmptyComments from '../../components/NewsEmptyComments';
import NewsIconsCard from '../../components/NewsIconsCard';
import RelatedNewsCard from '../../components/RelatedNewsCard';
import SectionHeader from '../../components/SectionHeader';
import reducer from '../../hooks/useReducer';
import { LOG } from '../../utils/Constants';
import { getCollection } from '../../utils/Firebase';
import styles from './styles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const initialState = {
  comments: [],
  relatedNews: [],
};

const profilePic =
  'https://res.cloudinary.com/practicaldev/image/fetch/s--ef-WXsPf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/8050/Mm3V3467.jpg';

const NewsDetails = () => {
  const { news, user } = useSelector((_state) => _state.root.firebase);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [commentText, setCommentText] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [stateVals, setStateVals] = useState({
    showMore: [],
  });

  useEffect(() => {
    getCollection('news', 5, (documents) =>
      dispatch({ relatedNews: documents }),
    );
    let listener = firestore()
      .collection('news')
      .doc(news.id)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        let allComments = [];
        querySnapshot.forEach((doc) => {
          allComments.push(doc.data());
        });
        setCommentCount(allComments.length);
        let tempComments = allComments;
        setStateVals((prev) => ({
          ...prev,
          showMore: tempComments.slice(0, 5),
        }));
        dispatch({ comments: allComments });
      });

    return listener;
  }, []);

  const handleSubmit = () => {
    if (commentText === '') {
      return;
    }

    setCommentText('');

    const data = {
      comment: commentText,
      createdAt: +new Date(),
      id: '',
      image: auth().currentUser.photoURL || '',
      postId: news.id,
      updatedAt: +new Date(),
      userId: auth().currentUser.uid,
      username: user.fullName || '',
    };

    firestore()
      .collection('news')
      .doc(news.id)
      .collection('comments')
      .add(data)
      .catch((err) => LOG('ERROR', err));
  };

  // console.log('Comment Count', commentCount);
  // console.log('Equality', commentCount === stateVals.showMore.length);

  const handleShowLess = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    let tempCom = state.comments;
    setStateVals((prev) => ({
      ...prev,
      showMore: tempCom.slice(0, 5),
    }));
  };

  const handleShowMore = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const index = stateVals.showMore.length;
    let tempComments = [
      ...stateVals.showMore,
      ...state.comments.slice(index, index + 5),
    ];
    setStateVals((prev) => ({
      ...prev,
      showMore: tempComments,
    }));
  };

  return (
    <Block>
      {Object.values(news).length > 0 ? (
        <View style={styles.container}>
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
            shareCount={news.shareCount}
            newsId={news.id}
          />
          <View style={styles.commentButton}>
            <TextInput
              value={commentText}
              style={styles.commentButtonText}
              placeholder="Leave a comment"
              placeholderTextColor="gray"
              onChangeText={(input) => setCommentText(input)}
            />
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.commentSection}>
            {state.comments ? (
              <>
                <FlatList
                  style={styles.commentListStyle}
                  ListEmptyComponent={() => <NewsEmptyComments />}
                  data={stateVals.showMore}
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
                        createdAt={createdAt}
                      />
                    );
                  }}
                />

                <View style={styles.showRootContainer}>
                  {stateVals.showMore.length > 5 ? (
                    <View style={styles.showContainer}>
                      <Text onPress={handleShowLess} style={styles.showText}>
                        Show Less
                      </Text>
                    </View>
                  ) : null}

                  {stateVals.showMore.length >= 5 &&
                  stateVals.showMore.length !== commentCount ? (
                    <View style={styles.showContainer}>
                      <Text onPress={handleShowMore} style={styles.showText}>
                        Show More
                      </Text>
                    </View>
                  ) : null}
                </View>
              </>
            ) : (
              <ActivityIndicator color="black" />
            )}
          </View>

          <SectionHeader
            icon={newsComment}
            name="Related News"
            isRequired={false}
          />

          <View style={styles.realtedNewsContainer}>
            {state.relatedNews ? (
              <FlatList
                data={state.relatedNews}
                keyExtractor={() => randomize('Aa0!', 10)}
                renderItem={({ item: { id, imgUrl, title, description } }) => {
                  if (id !== news.id) {
                    return (
                      <View style={{ paddingBottom: RFPercentage(2) }}>
                        <RelatedNewsCard
                          image={imgUrl}
                          title={title}
                          description={description}
                        />
                      </View>
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
      ) : (
        <ActivityIndicator color={'white'} />
      )}
    </Block>
  );
};

export default NewsDetails;
