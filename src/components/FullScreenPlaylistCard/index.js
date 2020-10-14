import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPlaylist } from '../../Redux/Reducers/audioSlice';

import styles from './styles';
import {
  newsComment,
  newsLike,
  newsShare,
  sendIcon,
  heartIcon,
  deleteIcon,
} from '../../../Assets/Icons';

const FullScreenPlaylistCard = ({ item }) => {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.root.audio.playlist);

  return (
    <View style={styles.container}>
      <ListItem containerStyle={{ backgroundColor: 'black' }}>
        <Image style={styles.avatar} source={{ uri: item.artwork[0] }} />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {item.artist}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Text style={styles.duration}>{item.duration}</Text>
        <TouchableOpacity onPress={() => dispatch(removeFromPlaylist(item))}>
          <Image source={deleteIcon} style={styles.deleteIcon} />
        </TouchableOpacity>
        {/* <Image source={} /> */}
      </ListItem>
    </View>
  );
};

export default FullScreenPlaylistCard;
