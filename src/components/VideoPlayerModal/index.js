import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import randomize from 'randomatic';
import React, { useEffect, useReducer, useState, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Keyboard,
  Pressable
} from 'react-native';
import { Divider } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { commentIcon, eyeIcon, videoIcon, closeIcon } from '../../../Assets/Icons';
import NewsCommentCard from '../../components/NewsCommentCard';
import NewVideosCard from '../../components/NewVideosCard';
import SectionHeader from '../../components/SectionHeader';
import reducer from '../../hooks/useReducer';
import { displayVideoModal, setVideoData } from '../../Redux/Reducers/helperSlice';
import { LOG } from '../../utils/Constants';
import { getCollection } from '../../utils/Firebase';
import { useDispatch } from 'react-redux'
import { thousandSeparator } from '../../utils/Helpers';
import SubscriptionModalScreen from '../SubscriptionBottomSheet';
import VideoPlayer from '../VideoPlayer';
import styles from './styles';

const screenWidth = Dimensions.get('window').width;


const initialState = {
  videos: [],
  comments: [],
};

const VideoPlayerModal = ({ onPress }) => {
  const widthAnim = useRef(new Animated.Value(screenWidth * 0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { user } = useSelector((_state) => _state.root.firebase);
  const disp = useDispatch()
  const { videoModal, videoData } = useSelector((_state) => _state.root.helpers);

  const [currentVideo, setCurrentVideo] = useState({})
  const [state, dispatch] = useReducer(reducer, initialState);
  const [commentText, setCommentText] = useState('');
  const [viewerCount, setViewerCount] = useState(0)
  const [stateVals, setStateVals] = useState({
    showMore: [],
  });
  const [durationTime, setDurationTime] = useState(0);

  const commentOpen = () => {
    Animated.timing(widthAnim, {
      toValue: screenWidth * 0.65,
      duartion: 1000,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  const commentClose = () => {
    Animated.timing(widthAnim, {
      toValue: screenWidth * 0.9,
      duartion: 1500,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 500,
    }).start();
  };

  const getCurrentVideo = () => {
    firestore()
      .collection('videos')
      .doc(videoData.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentVideo(doc.data())
        }
      })
  }
  const [collapse, setCollapse] = useState(false);

  console.log(user)

  useEffect(() => {
    getCollection('videos', 5, (documents) => dispatch({ videos: documents }));

    const listener = firestore()
      .collection('videos')
      .doc(videoData.id)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        let allComments = [];
        querySnapshot.forEach((doc) => {
          allComments.push(doc.data());
        });
        let tempComments = allComments;
        setStateVals((prev) => ({
          ...prev,
          showMore: tempComments.splice(0, 5),
        }));
        dispatch({ comments: allComments });
      });
    // getCurrentVideo();
    return () => listener;
  }, []);

  useEffect(() => {
    console.log(videoData);
  }, [videoData.viewCount])

  const handleSubmit = () => {

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
        image: user?.profilePicture || '',
        videoId: videoData.id,
        updatedAt: +new Date(),
        userId: auth().currentUser?.uid,
        username: user?.fullName || '',
      })
      .then((result) => {
        setCommentText('');
        const documentId = result.id;
        result.update({
          id: documentId,
        });
        commentClose();
        Keyboard.dismiss();
        setCommentText('');
      })
      .catch((err) => LOG('ADD ERROR', err));
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SubscriptionModalScreen duration={durationTime} />
      <Modal animationType="slide" visible={videoModal}>

        <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
          <SafeAreaView style={styles.safeArea} />
          <StatusBar barStyle="light-content" />
          <Pressable
            style={styles.container}
            onPress={() => {
              if (opacityAnim) {
                commentClose();
                Keyboard.dismiss();
              }
            }}>

            <TouchableOpacity
              style={styles.backContainer}
              onPress={() => {
                disp(displayVideoModal(false));
              }}>
              <Image source={closeIcon} style={styles.cancelIcon} />
            </TouchableOpacity>
            <VideoPlayer videoID={videoData.id} fileUrl={videoData.fileUrl} />

            <Text style={styles.title}>{videoData.title}</Text>
            <View style={styles.subContainer}>
              <Text style={styles.author}>{videoData.artist}</Text>
              <View style={styles.rowContainer}>
                <Image source={eyeIcon} style={styles.icon} />
                <Text style={styles.count}>
                  {thousandSeparator(videoData?.viewCount)}
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
                  <SectionHeader isRequired={false} icon={videoIcon} name="More Videos" />
                )}
                ItemSeparatorComponent={() => (
                  <Divider style={styles.divider} />
                )}
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
                        onPress={() => {
                          // disp(displayVideoModal(false));
                          disp(setVideoData(item));
                          // disp(displayVideoModal(true));
                        }}>
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

            {user &&
              <View style={styles.commentMainContainer}>
                <Animated.View
                  style={[styles.commentContainer, { width: widthAnim }]}>
                  <TextInput
                    value={commentText}
                    style={styles.commentButtonText}
                    onFocus={() => commentOpen()}
                    placeholder="Leave a comment"
                    placeholderTextColor="gray"
                    multiline={true}
                    onChangeText={(input) => setCommentText(input)}
                  />
                </Animated.View>
                <Animated.View
                  style={[
                    styles.sendButtonContainer,
                    {
                      opacity: opacityAnim,
                    },
                  ]}>
                  <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                    <Text style={styles.submitText}>SEND</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            }
            <View style={styles.commentSection}>
              {state.comments ? (
                <>
                  <FlatList
                    style={styles.commentListStyle}
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

                  <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                    {stateVals.showMore.length > 5 ? (
                      <View
                        style={{
                          margin: RFPercentage(1),
                          backgroundColor: 'grey',
                          borderRadius: 3,
                          padding: RFPercentage(0.5),
                        }}>
                        <Text
                          onPress={() => {
                            let tempCom = state.comments;
                            setStateVals((prev) => ({
                              ...prev,
                              showMore: tempCom.slice(
                                0,
                                stateVals.showMore.length - 5,
                              ),
                            }));
                          }}
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          Show Less
                        </Text>
                      </View>
                    ) : null}

                    <View
                      style={{
                        margin: RFPercentage(1),
                        backgroundColor: 'grey',
                        borderRadius: 3,
                        padding: RFPercentage(0.5),
                      }}>
                      <Text
                        onPress={() => {
                          let tempCom = state.comments;
                          setStateVals((prev) => ({
                            ...prev,
                            showMore: tempCom.slice(
                              0,
                              stateVals.showMore.length + 5,
                            ),
                          }));
                        }}
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        Show More
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                  <ActivityIndicator color="black" />
                )}
            </View>

          </Pressable>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default VideoPlayerModal;
