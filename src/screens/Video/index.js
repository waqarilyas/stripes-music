import React, { useEffect, useReducer } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { View, ActivityIndicator } from 'react-native';
import randomize from 'randomatic';

import Block from '../../components/Block';
import VideoSlider from '../../components/VideosSlider';
import { getCollection, getOrderedCollection } from '../../utils/Firebase';
// import Add from './utils';
import reducer from '../../hooks/useReducer';
import SectionHeader from '../../components/SectionHeader';
import { starIcon, videoIcon } from '../../../Assets/Icons';
import PopularVideos from '../../components/PopularVideo';
import PopularVideoHeader from '../../components/PopularVideoHeader';
import NewVideos from '../../components/NewVideos';
import styles from './styles';

const initialState = {
  videos: [],
  mostPopular: [],
  latestVideos: [],
};

const Video = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    // Get Videos
    getCollection('videos', 10, (collection) => {
      dispatch({ videos: collection });
    });

    // Get Popular Now Videos
    getOrderedCollection('videos', 'viewCount', 'desc', 9, (collection) => {
      dispatch({ mostPopular: collection });
    });

    // Get latest videos
    getOrderedCollection('videos', 'createdAt', 'desc', 10, (collection) => {
      dispatch({ latestVideos: collection });
    });
  }, []);

  return (
    <Block>
      {/* Video Slider */}
      {state.videos.length ? (
        <FlatList
          data={state.videos}
          horizontal
          keyExtractor={() => randomize('Aa0!', 10)}
          renderItem={({ item: { poster, title, artist } }) => {
            return (
              <VideoSlider poster={poster} title={title} artist={artist} />
            );
          }}
        />
      ) : (
        <ActivityIndicator color="white" />
      )}

      {/* Popular Now Videos */}
      <View style={styles.spacing}>
        <SectionHeader icon={starIcon} name="Popular Now" />
        {state.mostPopular.length ? (
          <ScrollView horizontal>
            <PopularVideoHeader
              poster={state.mostPopular[0].poster}
              title={state.mostPopular[0].title}
            />
            <FlatList
              numColumns={Math.ceil(data.length / 2)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={state.mostPopular}
              keyExtractor={() => randomize('Aa0!', 10)}
              renderItem={({ item: { poster } }) => {
                return <PopularVideos poster={poster} />;
              }}
            />
          </ScrollView>
        ) : (
          <ActivityIndicator color="white" />
        )}
      </View>

      {/* New Videos */}
      <ScrollView>
        {state.latestVideos.length ? (
          <FlatList
            style={styles.spacing}
            ListHeaderComponent={
              <SectionHeader icon={videoIcon} name="New Videos" />
            }
            keyExtractor={() => randomize('Aa0!', 10)}
            data={state.latestVideos}
            renderItem={({
              item: { poster, title, artist, likesCount, viewCount, duration },
            }) => {
              return (
                <NewVideos
                  poster={poster}
                  title={title}
                  artist={artist}
                  likesCount={likesCount}
                  viewCount={viewCount}
                  duration={duration}
                />
              );
            }}
            ListFooterComponent={<></>}
          />
        ) : (
          <ActivityIndicator color="white" />
        )}
      </ScrollView>
    </Block>
  );
};

export default Video;
