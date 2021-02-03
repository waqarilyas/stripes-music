import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { LOG } from '../../utils/Constants';

import styles from './styles';

const ArtistFollowCard = ({ artist }) => {
  const [status, setStatus] = useState(false);
  const uid = auth().currentUser.uid;
  const { user } = useSelector((state) => state.root.firebase);

  useEffect(() => {
    const listener = firestore()
      .collection('artists')
      .doc(artist?.id)
      .collection('followers')
      .doc(uid)
      .onSnapshot((document) => {
        if (document.exists) {
          setStatus(document.data().isFollowing);
        }
      });

    return listener;
  }, [artist]);

  const handleFollowingStatus = async () => {
    if (auth().currentUser.isAnonymous) {
      Alert.alert(
        'Login Required',
        'You must be logged in to follow this Artist!',
      );
    } else {
      setStatus(!status);
      try {
        const path = firestore().collection('artists');
        const subPath = path.doc(artist.id).collection('followers').doc(uid);
        await subPath.set(
          {
            userId: uid,
            username: user?.fullName,
            avatar: user?.profilePicture,
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
            name: `${artist?.firstName} ${artist?.lastName}`,
            updatedAt: +new Date(),
            isFollowing: !status,
            avatar: artist?.imgUrl,
          },
          { merge: true },
        );
      } catch (err) {
        LOG('HANDLE FOLLOWING STATUS', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      {artist ? (
        <>
          <View style={styles.subContainer}>
            <Avatar rounded size="medium" source={{ uri: artist.imgUrl }} />
            <View style={styles.detail}>
              <Text style={styles.artist}>
                {artist.firstName} {artist.lastName}
              </Text>
              {artist.followedBy ? (
                <Text style={styles.followers}>
                  {artist.followedBy.length} Followers
                </Text>
              ) : null}
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              status ? styles.unfollow : styles.follow,
            ]}
            onPress={handleFollowingStatus}>
            <Text style={styles.text}>{status ? 'UNFOLLOW' : 'FOLLOW'}</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

export default ArtistFollowCard;
