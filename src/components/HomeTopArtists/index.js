import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { topArtistIcon } from '../../../Assets/Icons';
import ArtistsHorizontalCard from '../ArtistsHorizontalCard';
import SectionHeader from '../SectionHeader';
import { getArtistId } from '../../Redux/Reducers/idsSlice';

const HomeTopArtists = ({ navigation }) => {
  const disp = useDispatch();
  const { artists } = useSelector((state) => state.root.firebase);

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
            <TouchableOpacity
              onPress={() => {
                disp(getArtistId(id));
                navigation.navigate('Artist', { artistId: id });
              }}>
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
