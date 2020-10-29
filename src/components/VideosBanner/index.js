import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import VideoSlider from '../VideosSlider';
import {
  displayVideoModal,
  setVideoData,
} from '../../Redux/Reducers/helperSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';

const VideosBanner = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.root.firebase);

  return (
    <FlatList
      data={videos}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item, item: { poster, title, artist } }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              dispatch(displayVideoModal(true));
              dispatch(setVideoData(item));
            }}>
            <VideoSlider poster={poster} title={title} artist={artist} />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default VideosBanner;
