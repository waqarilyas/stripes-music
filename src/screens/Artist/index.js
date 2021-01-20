import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import ArtistsTabs from '../../navigation/Tabs/ArtistsTabs';
import { LOG } from '../../utils/Constants';
import { thousandSeparator } from '../../utils/Helpers';
import styles from './styles';

const Artist = ({ route }) => {
  const { artist, user } = useSelector((state) => state.root.firebase);
  const [status, setStatus] = useState(false);
  const uid = auth().currentUser.uid;

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
  }, []);

  const handleFollowingStatus = async () => {
    setStatus(!status);
    try {
      const path = firestore().collection('artists');
      const subPath = path.doc(artist?.id).collection('followers').doc(uid);
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
        .doc(artist?.id);
      await subUserPath.set(
        {
          artistId: artist?.id,
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

  return artist ? (
    <>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={120}
            rounded
            source={{ uri: artist?.imgUrl }}
            renderPlaceholderContent={<ActivityIndicator color="black" />}
          />
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              status ? styles.unfollow : styles.follow,
            ]}
            onPress={handleFollowingStatus}>
            <Text style={styles.text}>{status ? 'UNFOLLOW' : 'FOLLOW'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerRight}>
          <Text style={[styles.title, { textAlign: 'left' }]}>
            {artist?.firstName} {artist?.lastName}
          </Text>
          <Text style={styles.subtitle}>
            {thousandSeparator(artist?.followerCount)}
          </Text>
          <Text style={styles.followerCountText}>Followers</Text>

          <Text style={styles.status}>Artist</Text>
        </View>
      </View>
      <ArtistsTabs />
    </>
  ) : (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={'white'} />
    </View>
  );
};

export default Artist;
