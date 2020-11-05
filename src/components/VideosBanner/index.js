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

  const playVideo = (item) => {
    const data = item;
    // data.createdAt = JSON.parse(data.createdAt);
    // data.updatedAt = JSON.parse(data.updatedAt);
    dispatch(displayVideoModal(true));
    dispatch(setVideoData(data));
  };

  return (
    <FlatList
      data={videos}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item, item: { poster, title, artist } }) => {
        return (
          <TouchableOpacity onPress={() => playVideo(item)}>
            <VideoSlider poster={poster} title={title} artist={artist} />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default VideosBanner;
