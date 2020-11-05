import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
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
import { thousandSeprator } from '../../utils/Helpers';
import { eyeIcon, playButton } from '../../../Assets/Icons';
import {
  fullScreenChange,
  changeSong,
  pushToPlaylist,
} from '../../Redux/Reducers/audioSlice';
import {
  addAlbumPlayCount,
  addToRecentlyPlayed,
  addPlayCount,
} from '../../Redux/Reducers/firebaseSlice';

const AlbumDetail = () => {
  const dispatch = useDispatch();
  const { album, albumSongs } = useSelector((state) => state.root.firebase);

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

      console.log('-----Result------', result);

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

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <ImageBackground
          loadingIndicatorSource={<ActivityIndicator color="white" />}
          source={{ uri: album.imgUrl }}
          style={styles.image}>
          <View style={styles.overlay}>
            <Text style={styles.title}>{album.title}</Text>
            <Text style={styles.subtitle}>{album.author}</Text>
            <Text style={styles.subtitle}>Duration: {album.duration}</Text>
            <View style={styles.viewContainer}>
              <Image source={eyeIcon} style={styles.eyeIcon} />
              <Text style={styles.viewCount}>
                {thousandSeprator(album.viewCount)}
              </Text>
            </View>
            <Image
              source={playButton}
              containerStyle={styles.playIcon}
              onPress={() => handleAddToPlaylist()}
            />
          </View>
        </ImageBackground>
        <Text style={styles.heading}>SONGS</Text>
        <FlatList
          style={styles.list}
          data={albumSongs}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          keyExtractor={(item) => item.id}
          renderItem={({
            item,
            item: { title, artist, artwork, id, duration, url },
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
      </View>
    </ScrollView>
  );
};

export default AlbumDetail;
