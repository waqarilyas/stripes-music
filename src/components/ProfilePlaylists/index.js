import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import randomize from 'randomatic';
import React, { useEffect, useReducer } from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import { iconsPlaylist, musicIcon } from '../../../Assets/Icons';
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
    firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .limit(10)
      .get()
      .then((documents) => {
        let data = [];
        documents.forEach((document) => {
          if (document.exists) {
            data.push(document.data());
          }
        });
        dispatch({ playlists: data });
      });
  }, []);

  return (
    <>
      <SectionHeader
        name="My Playlists"
        icon={musicIcon}
        onPress={() => navigation.navigate('ProfilePlaylists')}
        isRequired={state.playlists.length > 5}
      />
      <FlatList
        data={state.playlists}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={{ width: '100%' }}
        ListEmptyComponent={
          <EmptyProfileCard
            text="No playlists created yet. Create one"
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
