import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useReducer, useRef } from 'react';
import { Image, Text, View, Platform } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import Block from '../../components/Block';
import ProfileActionBar from '../../components/ProfileActionBar';
import ProfileArtists from '../../components/ProfileArtists';
import ProfileFavoriteSongs from '../../components/ProfileFavoriteSongs';
import ProfilePlaylists from '../../components/ProfilePlaylists';
import ProfileRecentlyPlayed from '../../components/ProfileRecentlyPlayed';
import reducer from '../../hooks/useReducer';
import styles from './styles';

const initialState = {
  artistFollowing: 0,
};

const ProfilePicPlaceholder = () => {
  return (
    <Image
      source={require('../../../Assets/Icons/icon-profile-placeholder.jpg')}
      style={styles.placeholder}
    />
  );
};

const ProfileScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useSelector((state) => state.root.firebase);
  const avatarRef = useRef();

  useEffect(() => {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((document) => {
        if (document.exists) {
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
      <View style={styles.pageTop}>
        {user.profilePicture ? (
          <Avatar
            ref={avatarRef}
            rounded
            containerStyle={styles.profilePictureContainer}
            overlayContainerStyle={styles.profilePicOverlayContainer}
            source={{ uri: user.profilePicture }}
          />
        ) : (
          <Avatar
            ref={avatarRef}
            rounded
            containerStyle={styles.profilePictureContainer}
            overlayContainerStyle={styles.profilePicOverlayContainer}
            renderPlaceholderContent={<ProfilePicPlaceholder />}
          />
        )}

        <View style={styles.pageTopNameView}>
          <View style={styles.header}>
            <Text numberOfLines={1} style={styles.artistName}>
              {user.fullName}
            </Text>
            <Text style={styles.followText}>{state.artistFollowing}</Text>
            <Text style={styles.followingCountText}>Following</Text>
            <Text style={styles.status}>Member</Text>
          </View>
        </View>
      </View>
      <ProfileActionBar
        navigation={navigation}
        profilePicture={user?.profilePicture}
      />
      <ProfilePlaylists navigation={navigation} styles={styles} />
      <ProfileFavoriteSongs navigation={navigation} />
      <ProfileArtists navigation={navigation} />
      {/* <ProfileRecentlyPlayed navigation={navigation} /> */}
    </Block>
  );
};

export default ProfileScreen;
