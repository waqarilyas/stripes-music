import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { topArtistIcon } from '../../../Assets/Icons';
import ArtistsHorizontalCard from '../ArtistsHorizontalCard';
import SectionHeader from '../SectionHeader';
import { getArtistId } from '../../Redux/Reducers/idsSlice';
import {
  getArtist,
  getArtistNews,
  getArtistPlaylists,
  getArtistPopularSongs,
} from '../../Redux/Reducers/firebaseSlice';

const HomeTopArtists = ({ navigation }) => {
  const dispatch = useDispatch();
  const { artists } = useSelector((state) => state.root.firebase);

  const handleArtist = (id) => {
    dispatch(getArtist(id));
    dispatch(getArtistId(id));
    dispatch(getArtistNews(id));
    dispatch(getArtistPopularSongs(id));
    dispatch(getArtistPlaylists(id));
    navigation.navigate('Artist');
  };

  return (
    <>
      <SectionHeader
        name="Top Artists"
        icon={topArtistIcon}
        onPress={() => navigation.navigate('ArtistsSeeAll')}
      />
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item: { id, firstName, lastName, imgUrl } }) => {
          return (
            <TouchableOpacity onPress={() => handleArtist(id)}>
              <ArtistsHorizontalCard
                name={`${firstName} ${lastName}`}
                avatar={imgUrl}
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default HomeTopArtists;
