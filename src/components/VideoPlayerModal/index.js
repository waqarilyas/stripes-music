import React, { useEffect, useReducer, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import randomize from 'randomatic';
import dayjs from 'dayjs';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { commentIcon, videoIcon, eyeIcon } from '../../../Assets/Icons';
import { thousandSeprator } from '../../utils/Helpers';
import SectionHeader from '../../components/SectionHeader';
import { getCollection } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import NewVideosCard from '../../components/NewVideosCard';
import { Divider } from 'react-native-elements';
import NewsCommentCard from '../../components/NewsCommentCard';
import styles from './styles';
import VideoPlayer from '../VideoPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { LOG } from '../../utils/Constants';
import SubscriptionModalScreen from '../SubscriptionBottomSheet';

const profilePic =
  'https://res.cloudinary.com/practicaldev/image/fetch/s--ef-WXsPf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/8050/Mm3V3467.jpg';

const initialState = {
  videos: [],
  comments: [],
};

const VideoPlayerModal = ({ onPress }) => {
  const { videoModal, videoData } = useSelector(
    (_state) => _state.root.helpers,
  );
  const [state, dispatch] = useReducer(reducer, initialState);
  const [commentText, setCommentText] = useState('');
  const [durationTime, setDurationTime] = useState(0);

  // LOG('VIDEO DATA', videoData);

  useEffect(() => {
    getCollection('videos', 5, (documents) => dispatch({ videos: documents }));

    const listener = firestore()
      .collection('videos')
      .doc(videoData.id)
      .collection('comments')
      .onSnapshot((querySnapshot) => {
        let allComments = [];
        querySnapshot.forEach((doc) => {
          allComments.push(doc.data());
        });
        dispatch({ comments: allComments });
      });

    return () => listener;
  }, [videoData.id]);

  const handleSubmit = () => {
    console.log('--------USER------', auth().currentUser)
    if (commentText === '') {
      return;
    }
    firestore()
      .collection('videos')
      .doc(videoData.id)
      .collection('comments')
      .add({
        comment: commentText,
        createdAt: +new Date(),
        id: '',
        image: profilePic,
        videoId: videoData.id,
        updatedAt: +new Date(),
        userId: auth().currentUser.uid,
        username: auth().currentUser.displayName || '',
      })
      .then((result) => {
        setCommentText('')
        const documentId = result.id;
        result.update({
          id: documentId,
        });
        setCommentText('');
      })
      .catch((err) => LOG('ADD ERROR', err));
  };

  const [collapse, setCollapse] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SubscriptionModalScreen duration={durationTime} />
      <Modal animationType="slide" visible={videoModal}>
        <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
          <SafeAreaView style={styles.safeArea} />
          <StatusBar barStyle="light-content" />
          <View style={styles.container}>
            <VideoPlayer fileUrl={videoData.fileUrl} onPress={onPress} />

            <Text style={styles.title}>{videoData.title}</Text>
            <View style={styles.subContainer}>
              <Text style={styles.author}>{videoData.artist}</Text>
              <View style={styles.rowContainer}>
                <Image source={eyeIcon} style={styles.icon} />
                <Text style={styles.count}>
                  {thousandSeprator(videoData.viewCount)}
                </Text>
              </View>
            </View>

            <Text style={styles.desc}>Description</Text>
            <Text style={styles.description} numberOfLines={collapse ? 0 : 2}>
              {videoData.description}
            </Text>
            <TouchableOpacity onPress={() => setCollapse(!collapse)}>
              <Text style={styles.seeMore}>
                {collapse ? 'See Less' : 'See More'}
              </Text>
            </TouchableOpacity>

            <View style={styles.slideContainer}>
              <FlatList
                data={state.videos}
                ListHeaderComponent={() => (
                  <SectionHeader icon={videoIcon} name="More Videos" />
                )}
                ItemSeparatorComponent={() => <Divider style={styles.divider} />}
                keyExtractor={() => randomize('Aa0!', 10)}
                renderItem={({
                  item,
                  item: {
                    poster,
                    title,
                    artist,
                    likesCount,
                    viewCount,
                    duration,
                  },
                }) => {
                  if (item.id === videoData.id) {
                    return null;
                  } else {
                    return (
                      <TouchableHighlight
                        onPress={() => console.log('OnPressed!')}>
                        <NewVideosCard
                          poster={poster}
                          title={title}
                          artist={artist}
                          likesCount={likesCount}
                          viewCount={viewCount}
                          duration={duration}
                        />
                      </TouchableHighlight>
                    );
                  }
                }}
              />
            </View>

            <SectionHeader
              icon={commentIcon}
              name="Comments"
              isRequired={false}
            />

            <View style={styles.commentButton}>
              <TextInput
                value={commentText}
                style={styles.commentButtonText}
                placeholder="Leave a comment"
                placeholderTextColor="gray"
                onChangeText={(input) => setCommentText(input)}
              />
            </View>
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.commentSection}>
              {state.comments ? (
                <FlatList
                  style={styles.commentListStyle}
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
                        createdAt={createdAt}
                      />
                    );
                  }}
                />
              ) : (
                  <ActivityIndicator color="black" />
                )}
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View >
  );
};

export default VideoPlayerModal;
