import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useReducer } from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import { iconsPlaylist } from '../../../Assets/Icons';
import reducer from '../../hooks/useReducer';
import EmptyProfileCard from '../EmptyProfileCard';
import ProfilePlaylistsCard from '../ProfilePlaylistsCard';
import SectionHeader from '../SectionHeader';

const initialState = {
  playlists: [],
};

const ProfilePlaylists = ({ navigation, styles }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.docs.forEach((document) => {
          if (document.exists) {
            data.push(document.data());
          }
        });
        dispatch({ playlists: data });
      });

    return () => listener;
  }, []);

  return (
    <>
      <SectionHeader
        name="My Playlists"
        icon={iconsPlaylist}
        onPress={() => navigation.navigate('ProfilePlaylists')}
        isRequired={state.playlists.length > 5}
      />
      <FlatList
        data={state.playlists}
        extraData={state.playlists.length}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={state.playlists.length > 0 ? null : { flex: 1 }}
        ListEmptyComponent={
          <EmptyProfileCard
            text="No playlists created"
            icon={iconsPlaylist}
            buttonTitle="CREATE PLAYLIST"
            onPress={() => navigation.navigate('CreateNewPlaylist')}
          />
        }
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({
          item: { image, title, songs, isPrivate, viewCount },
        }) => {
          return (
            <ProfilePlaylistsCard
              imgUrl={image}
              songCount={songs.length}
              title={title}
              isPrivate={isPrivate}
              viewCount={viewCount}
            />
          );
        }}
      />
    </>
  );
};

export default ProfilePlaylists;
