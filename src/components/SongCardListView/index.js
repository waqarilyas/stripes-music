import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import { heartGrayIcon } from '../../../Assets/Icons';
import { convertToMinutes } from '../../utils/Helpers';
import styles from './styles';

const SongCardListView = ({
  id,
  title,
  artist,
  arts,
  duration,
  isFavorite,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavorite = async () => {
    setFavorite(!favorite);
    const uid = auth().currentUser.uid;
    const userDoc = firestore().collection('users').doc(uid);
    await userDoc.get().then((document) => {
      if (document.exists) {
        if (favorite) {
          document.ref.set(
            {
              favoriteSongs: firestore.FieldValue.arrayRemove(id),
            },
            { merge: true },
          );
        } else {
          document.ref.set(
            {
              favoriteSongs: firestore.FieldValue.arrayUnion(id),
            },
            { merge: true },
          );
        }
      }
    });
  };

  return (
    <ListItem containerStyle={styles.container}>
      <Image source={{ uri: arts[0] }} style={styles.image} />
      <ListItem.Content>
        <ListItem.Title numberOfLines={1} style={styles.title}>
          {title}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{artist}</ListItem.Subtitle>
      </ListItem.Content>

      <TouchableOpacity onPress={handleFavorite}>
        <Image
          source={heartGrayIcon}
          style={favorite ? styles.tintedIcon : styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.duration}>{convertToMinutes(duration)}</Text>
    </ListItem>
  );
};

export default SongCardListView;
