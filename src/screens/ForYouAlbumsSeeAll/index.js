import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import {
  getAlbumSongs,
  getAnAlbum,
  addAlbumViewCount,
} from '../../Redux/Reducers/firebaseSlice';
import AlbumSeeAllComponent from '../../components/AlbumSeeAllComponent';

const ForYouAlbumsSeeAll = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allAlbums } = useSelector((state) => state.root.firebase);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Albums For You</Text>
        <Text style={styles.subtitle}>
          A collection of albums recommended just for you. We hope you like it!
        </Text>
      </View>

      <FlatList
        data={allAlbums}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({
          item: {
            id,
            imgUrl,
            title,
            duration,
            author,
            playCount,
            songCount,
            viewCount,
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
                playCount={playCount}
                songCount={songCount}
                viewCount={viewCount}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ForYouAlbumsSeeAll;
