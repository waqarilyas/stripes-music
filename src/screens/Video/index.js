import React from 'react';

import Block from '../../components/Block';
import VideosBanner from '../../components/VideosBanner';
import NewVideosSection from '../../components/NewVideosSection';
import VideoPlayerModal from '../../components/VideoPlayerModal';
import PopularVideosSection from '../../components/PopularVideosSection';

const Video = ({ navigation }) => {
  return (
    <Block>
      {/* Video Player Modal */}
      <VideoPlayerModal />

      {/* Video Slider */}
      <VideosBanner />

      {/* Popular Now Videos */}
      <PopularVideosSection navigation={navigation} />

      {/* New Videos */}
      <NewVideosSection navigation={navigation} />
    </Block>
  );
};

export default Video;
