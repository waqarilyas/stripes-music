import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ArtistsTabs from '../../navigation/Tabs/ArtistsTabs';
import styles from './styles';
import {
  getArtist,
  getArtistNews,
  getArtistPopularSongs,
  getArtistPlaylists,
} from '../../Redux/Reducers/firebaseSlice';
import { thousandSeprator } from '../../utils/Helpers';
import useUser from '../../hooks/useUser';
import { LOG } from '../../utils/Constants';

const Artist = ({ route }) => {
  const id = route.params.artistId;
  const dispatch = useDispatch();
  const artist = useSelector((state) => state.root.firebase.artist);
  const [status, setStatus] = useState(false);
  const uid = auth().currentUser.uid;
  const user = useUser();

  useEffect(() => {
    dispatch(getArtist(id));
    dispatch(getArtistNews(id));
    dispatch(getArtistPopularSongs(id));
    dispatch(getArtistPlaylists(id));
    // dispatch(getUser());
    const listener = firestore()
      .collection('artists')
      .doc(artist.id)
      .collection('followers')
      .doc(uid)
      .onSnapshot((document) => {
        if (document.exists) {
          const isFollowing = document.data().isFollowing;
          setStatus(isFollowing);
        }
      });

    return () => listener;
  }, [artist.id, uid, id]);

  const handleFollowingStatus = async () => {
    setStatus(!status);
    try {
      const path = firestore().collection('artists');
      const subPath = path.doc(artist.id).collection('followers').doc(uid);
      await subPath.set(
        {
          userId: uid,
          username: auth().currentUser.displayName,
          avatar: user.profilePicture,
          updatedAt: +new Date(),
          isFollowing: !status,
        },
        { merge: true },
      );
      const userPath = firestore().collection('users');
      const subUserPath = userPath
        .doc(uid)
        .collection('favArtists')
        .doc(artist.id);
      await subUserPath.set(
        {
          artistId: artist.id,
          name: `${artist.firstName} ${artist.lastName}`,
          updatedAt: +new Date(),
          isFollowing: !status,
          avatar: artist.imgUrl,
        },
        { merge: true },
      );
    } catch (err) {
      LOG('HANDLE FOLLOWING STATUS', err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            size="xlarge"
            rounded
            source={{ uri: artist.imgUrl }}
            renderPlaceholderContent={<ActivityIndicator color="black" />}
          />
        </View>
        <View style={styles.containerRight}>
          <Text style={styles.title}>
            {artist.firstName} {artist.lastName}
          </Text>
          <Text style={styles.subtitle}>
            {thousandSeprator(artist.followerCount)} Listeners
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleFollowingStatus()}>
            {LOG('STATUS', status)}
            <Text style={styles.text}>{status ? 'UNFOLLOW' : 'FOLLOW'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ArtistsTabs />
    </>
  );
};

export default Artist;
