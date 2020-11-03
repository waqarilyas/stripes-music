import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import SectionHeader from '../SectionHeader';
import { topAlbumsIcon } from '../../../Assets/Icons';
import BestPlaylistsCard from '../BestPlaylistsCard';
import {
  getAnAlbum,
  getAlbumSongs,
  addAlbumViewCount,
} from '../../Redux/Reducers/firebaseSlice';

const HomeTopAlbums = ({ navigation }) => {
  const dispatch = useDispatch();
  const { bestAlbums } = useSelector((state) => state.root.firebase);

  return (
    <>
      <SectionHeader
        name="Top Albums"
        icon={topAlbumsIcon}
        onPress={() => navigation.navigate('TopAlbumsSeeAll')}
      />
      <FlatList
        data={bestAlbums}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item: { id, imgUrl, songCount, title, viewCount } }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(getAnAlbum(id));
                dispatch(getAlbumSongs(id));
                dispatch(addAlbumViewCount(id));
                navigation.navigate('AlbumDetail');
              }}>
              <BestPlaylistsCard
                imgUrl={imgUrl}
                songCount={songCount}
                title={title}
                viewCount={viewCount}
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default HomeTopAlbums;
