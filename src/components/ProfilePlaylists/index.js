import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useReducer } from 'react';
import { Alert } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native';
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
      .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
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

  const gotoPlaylist = ({ image, title, songs, isPrivate, viewCount, id }) => {
    const songCount = songs.length;
    if (songCount === 0) {
      Alert.alert(
        'No Songs Inside',
        "This Playlist doesn't contain any songs at the moment!",
      );
    } else {
      navigation.navigate('PlaylistDetails', {
        image,
        title,
        songs,
        isPrivate,
        viewCount,
        id,
        songCount: songs.length,
      });
    }
  };

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
        renderItem={({ item }) => {
          const { image, title, songs, isPrivate, viewCount, id } = item;
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => gotoPlaylist(item)}>
              <ProfilePlaylistsCard
                imgUrl={image}
                songCount={songs.length}
                title={title}
                isPrivate={isPrivate}
                viewCount={viewCount}
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default ProfilePlaylists;
