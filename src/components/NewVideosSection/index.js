import React from 'react';
import randomize from 'randomatic';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from 'react-native-elements';
import { View, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles';
import NewVideosCard from '../NewVideosCard';
import SectionHeader from '../SectionHeader';
import { videoIcon } from '../../../Assets/Icons';
import {
  displayVideoModal,
  setVideoData,
} from '../../Redux/Reducers/helperSlice';

const NewVideosSection = ({ navigation }) => {
  const dispatch = useDispatch();
  const { latestVideos } = useSelector((state) => state.root.firebase);

  const playVideo = (item) => {
    const data = item;
    data.createdAt = JSON.parse(data.createdAt);
    data.updatedAt = JSON.parse(data.updatedAt);
    dispatch(displayVideoModal(true));
    dispatch(setVideoData(data));
  };

  return (
    <View style={styles.newVideosContainer}>
      <FlatList
        style={styles.spacing}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        ListHeaderComponent={
          <SectionHeader
            icon={videoIcon}
            name="New Videos"
            onPress={() => navigation.navigate('NewVideos')}
          />
        }
        keyExtractor={() => randomize('Aa0!', 10)}
        data={latestVideos}
        renderItem={({
          item,
          item: { poster, title, artist, likesCount, viewCount, duration },
        }) => {
          return (
            <TouchableOpacity onPress={() => playVideo(item)}>
              <NewVideosCard
                poster={poster}
                title={title}
                artist={artist}
                likesCount={likesCount}
                viewCount={viewCount}
                duration={duration}
              />
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<></>}
      />
    </View>
  );
};

export default NewVideosSection;
