import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Divider, Image } from 'react-native-elements';
import { useSelector } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import { useDispatch } from 'react-redux';

import styles from './styles';
import { LOG } from '../../utils/Constants';
import SongItem from '../../components/SongItem';
import { thousandSeparator } from '../../utils/Helpers';
import { eyeIcon, playButton } from '../../../Assets/Icons';
import {
  fullScreenChange,
  changeSong,
  pushToPlaylist,
} from '../../Redux/Reducers/audioSlice';
import {
  addAlbumPlayCount,
  addPlayCount,
} from '../../Redux/Reducers/firebaseSlice';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';
import { Animated } from 'react-native';

const AlbumDetail = () => {
  const dispatch = useDispatch();
  const { album, albumSongs } = useSelector((state) => state.root.firebase);
  let fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 2000,
    }).start();
  }, [fadeIn]);

  const handleAddToPlaylist = async () => {
    try {
      dispatch(changeSong(albumSongs[0]));
      albumSongs.forEach((song) => {
        dispatch(pushToPlaylist(song));
      });
      await TrackPlayer.add(albumSongs);
      dispatch(fullScreenChange(true));
      dispatch(addAlbumPlayCount(album.id));
    } catch (err) {
      LOG('ERROR', err);
    }
  };

  const playSong = async ({ title, artist, artwork, url, duration, id }) => {
    try {
      const result = {
        title,
        artist,
        artwork,
        url,
        duration,
        id,
        createdAt: +new Date(),
      };

      dispatch(changeSong(result));
      dispatch(pushToPlaylist(result));
      await TrackPlayer.add(result);
      dispatch(fullScreenChange(true));
      dispatch(addPlayCount(id));
      dispatch(addToRecentlyPlayed(result));
    } catch (error) {
      LOG('PLAY SONG', error);
    }
  };

  return album ? (
    <ScrollView style={styles.scrollContainer}>
      <Animated.View style={{ ...styles.container, opacity: fadeIn }}>
        <Image
          source={{ uri: album?.imgUrl }}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="white" />}
          placeholderStyle={styles.placeholderStyle}>
          <View style={styles.overlay}>
            <Text style={styles.title}>{album.title}</Text>
            <Text style={styles.subtitle}>{album.author}</Text>
            <Text style={styles.subtitle}>Duration: {album.duration}</Text>
            <View style={styles.viewContainer}>
              <Image source={eyeIcon} style={styles.eyeIcon} />
              <Text style={styles.viewCount}>
                {thousandSeparator(album.viewCount)}
              </Text>
            </View>
            <Image
              source={playButton}
              containerStyle={styles.playIcon}
              onPress={() => handleAddToPlaylist()}
            />
          </View>
        </Image>
        <Text style={styles.heading}>SONGS</Text>
        <FlatList
          style={styles.list}
          data={albumSongs}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          keyExtractor={(item) => item.id}
          renderItem={({
            item,
            item: { title, artist, artwork, id, duration },
          }) => {
            return (
              <TouchableOpacity onPress={() => playSong(item)}>
                <SongItem
                  title={title}
                  author={artist}
                  image={artwork}
                  id={id}
                  duration={duration}
                />
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
    </ScrollView>
  ) : (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={'white'} />
    </View>
  );
};

export default AlbumDetail;
