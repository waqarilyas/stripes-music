import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import SectionHeader from '../SectionHeader';
import { topAlbumsIcon } from '../../../Assets/Icons';
import BestPlaylistsCard from '../BestPlaylistsCard';
import { useDispatch } from 'react-redux';
import {
  getAnAlbum,
  getAlbumSongs,
  addAlbumViewCount,
} from '../../Redux/Reducers/firebaseSlice';
import firestore from '@react-native-firebase/firestore';

const HomeTopAlbums = ({ navigation }) => {
  const dispatch = useDispatch();
  const [bestAlbums, setBestAlbums] = useState();

  useEffect(() => {
    const listener = firestore()
      .collection('albums')
      .orderBy('viewCount', 'desc')
      .onSnapshot((snapshot) => {
        const bestAlbums = [];
        snapshot.forEach((doc) => {
          bestAlbums.push(doc.data());
        });
        setBestAlbums(bestAlbums);
      });

    return () => listener();
  });

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
