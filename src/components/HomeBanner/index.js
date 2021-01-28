import React, { useRef } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import { musicSeeAllIcon, sliderPlaceholder } from '../../../Assets/Icons';
import HomeTopSlider from '../HomeTopSlider';
import styles from './styles';

const HomeBanner = ({ currentItemImage, playSong }) => {
  const { songs } = useSelector((state) => state.root.firebase);
  let carousel = useRef(null);

  const updateIndex = () => {
    if (
      carousel.currentIndex &&
      carousel.currentIndex >= 0 &&
      songs[carousel.currentIndex]?.artwork
    )
      currentItemImage(songs[carousel.currentIndex].artwork);
  };

  return (
    <Carousel
      horizontal
      ref={carousel}
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
          <TouchableOpacity onPress={() => playSong(item, songs)}>
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

export default HomeBanner;
