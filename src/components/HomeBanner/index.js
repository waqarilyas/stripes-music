import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  changeSong,
  pushToPlaylist,
  fullScreenChange,
} from '../../Redux/Reducers/audioSlice';
import TrackPlayer from 'react-native-track-player';

import HomeTopSlider from '../HomeTopSlider';
import { sliderPlaceholder, musicSeeAllIcon } from '../../../Assets/Icons';
import { LOG } from '../../utils/Constants';

const HomeBanner = () => {
  const { songs } = useSelector((state) => state.root.firebase);
  // const currentSong = useSelector((state) => state.root.audio.currentSong);
  const dispatch = useDispatch();

  const addViewCount = (id) => {
    const postReference = firestore().collection('songs').doc(id);

    return firestore().runTransaction(async (transaction) => {
      const postSnapshot = await transaction.get(postReference);

      if (!postReference) {
        throw 'Post does not exist';
      }

      await transaction.update(postReference, {
        playCount: postSnapshot.data().playCount + 1,
      });
    });
  };

  const addToRecentlyPlayed = async (result) => {
    const uid = auth().currentUser.uid;
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('history')
      .add(result);
  };

  const playSong = async ({ title, artist, artwork, url, duration, id }) => {
    try {
      const result = {
        title,
        artist,
        artwork,
        url,
        duration,
        id,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      dispatch(changeSong(result));
      dispatch(pushToPlaylist(result));
      await TrackPlayer.add(result);
      dispatch(fullScreenChange(true));
      addViewCount(id);
      addToRecentlyPlayed(result);
    } catch (error) {
      LOG('PLAY SONG', error);
    }
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={[...songs, { seeAll: true }]}
      keyExtractor={(item) => item.id}
      renderItem={({
        item,
        item: {
          id,
          artist,
          artwork,
          title,
          url,
          duration,
          description,
          seeAll,
        },
      }) => {
        if (seeAll) {
          return (
            <TouchableOpacity>
              <ImageBackground
                blurRadius={5}
                source={sliderPlaceholder}
                style={styles.container}>
                <View style={styles.subContainer}>
                  <Image source={musicSeeAllIcon} style={styles.icon} />
                  <Text style={styles.text}>See All Songs</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            onPress={() => {
              playSong(item);
            }}>
            <HomeTopSlider
              artwork={artwork}
              title={title}
              description={description}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('20'),
    width: hp('34'),
    borderRadius: hp('2'),
    margin: hp('1'),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100%',
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: hp('1'),
  },
  icon: {
    height: hp('6'),
    width: hp('6'),
    tintColor: 'white',
  },
});

export default HomeBanner;
