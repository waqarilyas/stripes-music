import React from 'react';
import { Divider } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles';
import {
  getAnAlbum,
  getAlbumSongs,
  addAlbumViewCount,
} from '../../Redux/Reducers/firebaseSlice';
import AlbumSeeAllComponent from '../../components/AlbumSeeAllComponent';

const TopAlbumsSeeAll = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allBestAlbums } = useSelector((state) => state.root.firebase);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Top Albums</Text>
        <Text style={styles.subtitle}>
          A collection of top albums recommended just for you. Listen to albums
          which the world loves.
        </Text>
      </View>
      <FlatList
        data={allBestAlbums}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({
          item: {
            id,
            duration,
            title,
            author,
            imgUrl,
            viewCount,
            playCount,
            songCount,
          },
        }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(getAnAlbum(id));
                dispatch(getAlbumSongs(id));
                dispatch(addAlbumViewCount(id));
                navigation.navigate('AlbumDetail');
              }}>
              <AlbumSeeAllComponent
                image={imgUrl}
                title={title}
                duration={duration}
                author={author}
                viewCount={viewCount}
                playCount={playCount}
                songCount={songCount}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TopAlbumsSeeAll;
