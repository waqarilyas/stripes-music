import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles';
import { thousandSeprator } from '../../utils/Helpers';
import { eyeIcon } from '../../../Assets/Icons';

const ProfilePlaylistsCard = ({
  imgUrl,
  songCount,
  title,
  isPrivate,
  viewCount,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imgUrl }} style={styles.image}>
        <View style={styles.badge}>
          <Text style={styles.noSongs}>{songCount} SONGS</Text>
        </View>
      </Image>
      <Text style={styles.title}>{title}</Text>

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
