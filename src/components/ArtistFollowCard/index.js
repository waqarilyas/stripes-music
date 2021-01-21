import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { getDocument } from '../../utils/Firebase';
import styles from './styles';
import reducer from '../../hooks/useReducer';

const initialState = {
  artist: {},
};

const ArtistFollowCard = ({ artistId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [status, setStatus] = useState(false);
  const uid = auth().currentUser.uid;
  const { user, artist } = useSelector((state) => state.root.firebase);

  useEffect(() => {
    getDocument('artists', artistId, (document) =>
      dispatch({ artist: document }),
    );
  }, [artistId]);

  useEffect(() => {
    const listener = firestore()
      .collection('artists')
      .doc(artistId)
      .collection('followers')
      .doc(uid)
      .onSnapshot((document) => {
        if (document.exists) {
          setStatus(document.data().isFollowing);
        }
      });

    return listener;
  }, []);

  const handleFollowingStatus = async () => {
    setStatus(!status);
    try {
      const path = firestore().collection('artists');
      const subPath = path.doc(artistId).collection('followers').doc(uid);
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
        .doc(artistId);
      await subUserPath.set(
        {
          artistId,
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
  };

  return (
    <View style={styles.container}>
      {state.artist ? (
        <>
        <View style={styles.subContainer}>
            <Avatar rounded size="medium" source={{ uri: state.artist.imgUrl }} />
            <View style={styles.detail}>
              <Text style={styles.artist}>
                {state.artist.firstName} {state.artist.lastName}
              </Text>
              {state.artist.followedBy ? (
                <Text style={styles.followers}>
                  {state.artist.followedBy.length} Followers
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
