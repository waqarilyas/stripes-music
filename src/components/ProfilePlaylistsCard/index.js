import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import { thousandSeprator } from '../../utils/Helpers';
import { playlistDefault, eyeIcon } from '../../../Assets/Icons';

const ProfilePlaylistsCard = ({
  imgUrl,
  songCount,
  title,
  isPrivate,
  viewCount,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imgUrl === '' ? playlistDefault : { uri: imgUrl }}
        style={styles.image}>
        <View style={styles.badge}>
          <Text style={styles.noSongs}>{songCount} SONGS</Text>
        </View>
      </ImageBackground>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {isPrivate ? (
        <View style={styles.privateContainer}>
          <Text style={styles.status}>Private</Text>
        </View>
      ) : (
        <>
          <View style={styles.publicContainer}>
            <Text style={styles.status}>Public</Text>
          </View>
          <View style={styles.viewCountContainer}>
            <Image style={styles.icon} source={eyeIcon} />
            <Text style={styles.viewCount}>{thousandSeprator(viewCount)}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default ProfilePlaylistsCard;
