import React, {useState, useEffect} from 'react';
import { View, Share, Text, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import {
  eyeIconWhite,
  shareIcon,
  newLikeIconWhite,
} from '../../../Assets/Icons';
import { thousandSeparator } from '../../utils/Helpers';



const NewsIconsCard = ({ viewCount, likedBy, shareCount, newsId }) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const uid = auth().currentUser.uid;

  useEffect(() => {
    const listener = firestore()
      .collection('news')
      .doc(newsId)
      .onSnapshot((document) => {
        if (document.exists) {
          const {likeCount, likedBy} = document.data();
          setLikeCount(likeCount);
          if(likedBy?.includes(uid)) {
            setLike(true);
          }
        }
      });
    return listener;
  }, []);

  const likeHandler = async () => {
    const counter = !like ? likeCount + 1 : likeCount - 1;
    setLikeCount(counter);
    setLike(!like);
      const newsPath = firestore().collection('news').doc(newsId);
      newsPath.update({
        likedBy: !like ? firestore.FieldValue.arrayUnion(uid) : firestore.FieldValue.arrayRemove(uid),
        likeCount: !like ? likeCount + 1 : likeCount > 0 ? likeCount - 1 : 0
    }).then(() => {
    
    }).catch((err) => {
        LOG('HANDLE LIKE STATUS', err);
    });
  };
  
  const onShare = async () => {
      try {
        const result = await Share.share({
          message: 'Share Options',
          url: 'https://www.google.com',
          title: 'Share Music App',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {

            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        console.log(error);
      }
  };


  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={eyeIconWhite} style={styles.icon} />
        <Text style={styles.count}>{thousandSeparator(viewCount)}</Text>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={likeHandler}>
          <Image
            source={newLikeIconWhite}
            style={like ? styles.activatedIcon : styles.icon}
          />
        </TouchableOpacity>
        <Text style={like ? styles.activatedCount : styles.count}>
          {thousandSeparator(likeCount)}
        </Text>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onShare}>
          <Image source={shareIcon} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.count}>{thousandSeparator(shareCount)}</Text>
      </View>
    </View>
  );
};

export default NewsIconsCard;
