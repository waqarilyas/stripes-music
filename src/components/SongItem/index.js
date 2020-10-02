import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { plusIcon } from '../../../Assets/Icons';

const SongItem = ({ title, author }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
      </View>
      <Image source={plusIcon} style={styles.add} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  author: {
    color: 'gray',
    marginTop: 6,
    fontSize: 12,
  },
  add: {
    resizeMode: 'contain',
    tintColor: 'gray',
    position: 'absolute',
    right: 0,
    height: 22,
    width: 22,
    alignSelf: 'center',
  },
});

export default SongItem;
