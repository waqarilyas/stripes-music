import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles';

import SeeAll from '../../components/SeeAll';
import PlaylistCard from '../../components/PlaylistCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAnAlbum, getAlbumSongs } from '../../Redux/Reducers/firebaseSlice';

const ForYouAlbums = ({ navigation }) => {
  const dispatch = useDispatch();
  const { albums } = useSelector((state) => state.root.firebase);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={Math.ceil(11 / 4)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[...albums, { seeAll: true }]}
        renderItem={({ item: { id, title, imgUrl, seeAll, songCount } }) => {
          if (seeAll) {
            return (
              <SeeAll
                onPress={() => navigation.navigate('ForYouAlbumsSeeAll')}
              />
            );
          } else {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(getAnAlbum(id));
                  dispatch(getAlbumSongs(id));
                  navigation.navigate('AlbumDetail');
                }}>
                <PlaylistCard
                  title={title}
                  image={imgUrl}
                  songsCount={songCount}
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
