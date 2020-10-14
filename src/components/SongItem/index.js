import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { plusIcon, heartGrayIcon } from '../../../Assets/Icons';

const SongItem = ({ title, author, image, id, isFavorite }) => {
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
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.author}>{author}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Image source={plusIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={handleFavorite}>
          <Image
            source={heartGrayIcon}
            style={favorite ? styles.favoriteIcon : styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const icon = {
  resizeMode: 'contain',
  tintColor: 'gray',
  width: 18,
  height: 18,
  paddingHorizontal: 20,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  textContainer: {
    flexDirection: 'column',
    flexShrink: 1,
    width: '100%',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  author: {
    color: 'gray',
    marginTop: 2,
    fontSize: 12,
  },
  icon: {
    ...icon,
  },
  favoriteIcon: {
    ...icon,
    tintColor: '#e81093',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 12,
    resizeMode: 'cover',
    marginRight: 12,
  },
});

export default SongItem;
