import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import { Image, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Block from '../../components/Block';
import ProfileActionBar from '../../components/ProfileActionBar';
import ProfileArtists from '../../components/ProfileArtists';
import ProfileFavoriteSongs from '../../components/ProfileFavoriteSongs';
import ProfilePlaylists from '../../components/ProfilePlaylists';
import styles from './styles';

const ProfilePicPlaceholder = () => {
  return (
    <Image
      source={require('../../../Assets/Icons/icon-profile-placeholder.jpg')}
      style={styles.placeholder}
    />
  );
};

const ProfileScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.root.firebase);
  const [followCount, setFollowCount] = useState();
  const avatarRef = useRef();

  useEffect(() => {
    const uid = auth().currentUser?.uid;
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('favArtists')
      .where('isFollowing', '==', true)
      .onSnapshot((snapshot) => {

        setFollowCount(snapshot.size);
      });
    return () => listener();
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
            <Text style={styles.followText}>{followCount}</Text>
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
