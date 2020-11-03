import React from 'react';
import { View, FlatList, TouchableHighlight, Text } from 'react-native';
import randomize from 'randomatic';
import { Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles';
import NewVideosCard from '../../components/NewVideosCard';
import {
  displayVideoModal,
  setVideoData,
} from '../../Redux/Reducers/helperSlice';

const VideoPopularNow = () => {
  const dispatch = useDispatch();
  const { allPopularVideos } = useSelector((state) => state.root.firebase);

  const playVideo = (item) => {
    const data = item;
    data.createdAt = JSON.parse(data.createdAt);
    data.updatedAt = JSON.parse(data.updatedAt);
    dispatch(displayVideoModal(true));
    dispatch(setVideoData(data));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Popular Now</Text>
        <Text style={styles.subtitle}>
          A collection of popular videos recommended just for you. We hope you
          like it!
        </Text>
      </View>

      <FlatList
        style={styles.list}
        data={allPopularVideos}
        keyExtractor={() => randomize('Aa0!', 10)}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({
          item,
          item: { poster, title, artist, viewCount, duration },
        }) => {
          return (
            <TouchableHighlight onPress={() => playVideo(item)}>
              <NewVideosCard
                poster={poster}
                title={title}
                artist={artist}
                viewCount={viewCount}
                duration={duration}
              />
            </TouchableHighlight>
          );
        }}
      />
    </View>
  );
};

export default VideoPopularNow;
