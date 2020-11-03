import React from 'react';
import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import SectionHeader from '../SectionHeader';
import { starIcon } from '../../../Assets/Icons';
import styles from './styles';
import {
  displayVideoModal,
  setVideoData,
} from '../../Redux/Reducers/helperSlice';
import PopularVideoHeader from '../PopularVideoHeader';
import PopularVideos from '../PopularVideo';

const PopularVideosSection = ({ navigation }) => {
  const dispatch = useDispatch();
  const { popularVideos } = useSelector((state) => state.root.firebase);

  const playFirstVideo = () => {
    const first = popularVideos[0];
    first.createdAt = JSON.parse(first.createdAt);
    first.updatedAt = JSON.parse(first.updatedAt);
    dispatch(displayVideoModal(true));
    dispatch(setVideoData(first));
  };

  const playVideo = (item) => {
    const data = item;
    data.createdAt = JSON.parse(data.createdAt);
    data.updatedAt = JSON.parse(data.updatedAt);
    dispatch(displayVideoModal(true));
    dispatch(setVideoData(data));
  };

  return (
    <View style={styles.spacing}>
      <SectionHeader
        icon={starIcon}
        name="Popular Now"
        onPress={() => navigation.navigate('VideoPopularNow')}
      />
      <ScrollView horizontal>
        <TouchableOpacity onPress={() => playFirstVideo}>
          {popularVideos.length > 0 ? (
            <PopularVideoHeader
              poster={popularVideos[0].poster}
              title={popularVideos[0].title}
              onPress={playFirstVideo}
            />
          ) : null}
        </TouchableOpacity>

        <FlatList
          numColumns={Math.ceil(10 / 4)}
          data={popularVideos}
          keyExtractor={(item) => item.id}
          renderItem={({ item, item: { poster }, index }) => {
            const data = item;
            item.createdAt = JSON.parse(data.createdAt);
            item.updatedAt = JSON.parse(data.updatedAt);
            if (index === 0) {
              return null;
            } else {
              return (
                <TouchableOpacity onPress={() => playVideo(item)}>
                  <PopularVideos poster={poster} />
                </TouchableOpacity>
              );
            }
          }}
        />
      </ScrollView>
    </View>
  );
};

export default PopularVideosSection;
