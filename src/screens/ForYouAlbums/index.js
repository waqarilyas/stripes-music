import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles';

import SeeAll from '../../components/SeeAll';
import PlaylistCard from '../../components/PlaylistCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  getAnAlbum,
  getAlbumSongs,
  addAlbumViewCount,
} from '../../Redux/Reducers/firebaseSlice';

const ForYouAlbums = ({ navigation }) => {
  const dispatch = useDispatch();
  const { albums } = useSelector((state) => state.root.firebase);

  const handleAlbum = (id) => {
    dispatch(getAlbumSongs(id));
    dispatch(getAnAlbum(id));
    dispatch(addAlbumViewCount(id));
    navigation.navigate('AlbumDetail');
  };

  const handleSeeAllNavigation = () =>
    navigation.navigate('ForYouAlbumsSeeAll');

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={Math.ceil(8 / 2)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[...albums, { seeAll: true }]}
        renderItem={({ item: { id, title, imgUrl, seeAll, songCount } }) => {
          if (seeAll) {
            return <SeeAll onPress={handleSeeAllNavigation} />;
          } else {
            return (
              <TouchableOpacity onPress={() => handleAlbum(id)}>
                <PlaylistCard
                  title={title}
                  image={imgUrl}
                  songCount={songCount}
                />
              </TouchableOpacity>
            );
          }
        }}
      />
    </ScrollView>
  );
};

export default ForYouAlbums;
