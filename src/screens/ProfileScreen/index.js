import React, { useEffect, useReducer, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Image, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { profilePicPlaceholder, menuIcon } from '../../../Assets/Icons';
import Block from '../../components/Block';
import ProfileArtists from '../../components/ProfileArtists';
import ProfilePlaylists from '../../components/ProfilePlaylists';
import ProfileRecentlyPlayed from '../../components/ProfileRecentlyPlayed';
import ProfileFavoriteSongs from '../../components/ProfileFavoriteSongs';
import reducer from '../../hooks/useReducer';
import styles from './styles';
import ProfileActionBar from '../../components/ProfileActionBar';

const initialState = {
  user: {},
  artistFollowing: 0,
};

const ProfilePicPlaceholder = () => {
  return <Image source={profilePicPlaceholder} style={styles.placeholder} />;
};

const ProfileScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useSelector((state) => state.root.firebase.user);

  console.log('-------USer-----', user);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((document) => {
        if (document.exists) {
          console.log(document.data());
          const user = document.data();
          if (user.artistFollowing) {
            const artists = user.artistFollowing.length;
            console.log(artists);
            dispatch({
              user: user,
              artistFollowing: artists,
            });
          } else {
            dispatch({ user: user });
          }
        }
      });
  }, []);

  return (
    <Block>
      {user && (
        <View style={styles.pageTop}>
          <Avatar
            rounded
            containerStyle={styles.profilePictureContainer}
            overlayContainerStyle={styles.profilePicOverlayContainer}
            source={{ uri: user.profilePicture }}
            renderPlaceholderContent={<ProfilePicPlaceholder />}
          />
          <View style={styles.pageTopNameView}>
            <Text numberOfLines={1} style={styles.artistName}>{user.fullName}</Text>
            <View>
              <Text style={styles.followText}>{state.artistFollowing}</Text>
              <Text style={styles.followSubtext}>Following</Text>
            </View>
          </View>
        </View>
      )}

      <ProfileActionBar navigation={navigation} />
      <ProfilePlaylists navigation={navigation} styles={styles} />
      <ProfileFavoriteSongs navigation={navigation} />
      <ProfileArtists navigation={navigation} />
      <ProfileRecentlyPlayed navigation={navigation} />
    </Block>
  );
};

export default ProfileScreen;
