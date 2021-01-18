import React, { useRef } from 'react';
import {
  Dimensions,

  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import TrackPlayer from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import { musicSeeAllIcon, sliderPlaceholder } from '../../../Assets/Icons';
import {
  changeSong,
  fullScreenChange, pushToPlaylist
} from '../../Redux/Reducers/audioSlice';
import {
  addPlayCount, addToRecentlyPlayed
} from '../../Redux/Reducers/firebaseSlice';
import { LOG } from '../../utils/Constants';
import HomeTopSlider from '../HomeTopSlider';


const HomeBanner = ({ currentItemImage }) => {
  const { songs } = useSelector((state) => state.root.firebase);
  const dispatch = useDispatch();
  let _carousel = useRef(null);
  const playSong = async ({ title, artist, artwork, url, duration, id }) => {
    try {
      const result = {
        title,
        artist,
        artwork,
        url,
        duration,
        id,
        createdAt: +new Date(),
      };
      dispatch(changeSong(result));
      dispatch(pushToPlaylist(result));
      await TrackPlayer.add(result);
      dispatch(fullScreenChange(true));
      dispatch(addPlayCount(id));
      dispatch(addToRecentlyPlayed(result));
    } catch (error) {
      LOG('PLAY SONG', error);
    }
  };

  function updateIndex() {
    if (_carousel.currentIndex && _carousel.currentIndex >= 0 && songs[_carousel.currentIndex]?.artwork)
      currentItemImage(songs[_carousel.currentIndex].artwork)
  }

  return (
    <Carousel
      horizontal
      // pagingEnabled={true}

      ref={(c) => { _carousel = c; }}
      sliderWidth={Dimensions.get('screen').width}
      sliderHeight={hp('23')}

      itemWidth={hp('34')}
      itemHeight={hp('20')}

      onSnapToItem={updateIndex}

      showsHorizontalScrollIndicator={false}
      data={[...songs, { seeAll: true }]}
      keyExtractor={(item) => item.id}
      renderItem={({ item, item: { artwork, title, description, seeAll } }) => {
        if (seeAll) {
          return (
            <TouchableOpacity style={{ margin: hp('0.4') }}>
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
          <TouchableOpacity onPress={() => playSong(item)} style={{}}>
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
