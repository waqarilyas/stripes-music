import React from 'react';
import { Image, Text, TouchableOpacity, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { deleteIcon } from '../../../Assets/Icons';
import { removeFromPlaylist } from '../../Redux/Reducers/audioSlice';
import styles from './styles';

const FullScreenPlaylistCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <ListItem containerStyle={styles.container}>
      <Image style={styles.avatar} source={{ uri: item.artwork }} />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {item.artist}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Text style={styles.duration}>{(item.duration / 60).toFixed(3)}</Text>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Confirm!',
            'Are you sure you want to delete this song from list?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => dispatch(removeFromPlaylist(item)) },
            ],
            { cancelable: false },
          );
        }}>
        <Image source={deleteIcon} style={styles.deleteIcon} />
      </TouchableOpacity>
      {/* <Image source={} /> */}
    </ListItem>
  );
};

export default FullScreenPlaylistCard;
