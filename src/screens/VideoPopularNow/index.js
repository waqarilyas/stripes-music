import React, { useState, useEffect, useReducer } from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';
import randomize from 'randomatic';

import styles from './styles';
import NewVideosCard from '../../components/NewVideosCard';
import { getOrderedCollections } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import { Divider } from 'react-native-paper';
import VideoPlayerModal from '../../components/VideoPlayerModal';

const initialState = {
  videos: [],
};

const VideoPopularNow = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [visible, setVisible] = useState(false);
  const [itemData, setItemData] = useState({});

  useEffect(() => {
    getOrderedCollections('videos', 'createdAt', 'desc', (collection) => {
      dispatch({ videos: collection });
    });
  }, []);

  return (
    <View style={styles.container}>
      <VideoPlayerModal
        modalVisible={visible}
        onPress={() => setVisible(false)}
        itemData={itemData}
        setItemData={setItemData}
      />

      {state.videos.length ? (
        <FlatList
          style={styles.list}
          data={state.videos}
          keyExtractor={() => randomize('Aa0!', 10)}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          renderItem={({
            item,
            item: { poster, title, artist, viewCount, duration },
          }) => {
            return (
              <TouchableHighlight
                onPress={() => {
                  setItemData(item);
                  setVisible(true);
                }}>
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
      ) : null}
    </View>
  );
};

export default VideoPopularNow;
