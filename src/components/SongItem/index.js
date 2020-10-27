import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Avatar, CheckBox, Overlay } from 'react-native-elements';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  heartGrayIcon,
  playlist,
  plusIcon,
  queueIcon,
  tickIcon,
} from '../../../Assets/Icons';
import SongCardListView from '../../components/SongCardListView';

const SongItem = ({ title, author, image, id, duration }) => {
  const [visible, setVisible] = useState(false);
  const [addToQueue, setAddToQueue] = useState(false);
  const [checked, setChecked] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const uid = auth().currentUser.uid;

  useEffect(() => {
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('favSongs')
      .doc(id)
      .onSnapshot((document) => {
        if (document.exists) {
          const isFavorite = document.data().isFavorite;
          setFavorite(isFavorite);
        }
      });

    return () => listener;
  }, []);

  const handleFavorite = async () => {
    // setFavorite(!favorite);
    const userFavDoc = firestore()
      .collection('users')
      .doc(uid)
      .collection('favSongs');
    await userFavDoc.doc(id).set(
      {
        title,
        author,
        image,
        id,
        isFavorite: !favorite,
        duration,
      },
      { merge: true },
    );
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      {visible && (
        <Overlay
          isVisible={visible}
          ListEmptyComponent={() => <ActivityIndicator color="black" />}
          onBackdropPress={toggleOverlay}
          overlayStyle={
            playlistOpen ? styles.playlistOpenOverlay : styles.overlay
          }>
          <SongCardListView
            title={title}
            artist={author}
            arts={image}
            duration={duration}
          />

          <View style={styles.overlayBottom}>
            <TouchableOpacity
              onPress={() => setPlaylistOpen(!playlistOpen)}
              style={styles.overLayBottomContainer}>
              <>
                <Avatar size={40} rounded source={playlist} />
                <Text style={styles.overlayTitle}>Add To Playlist</Text>
              </>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.overLayBottomContainer}
              onPress={() => setAddToQueue(!addToQueue)}>
              {addToQueue ? (
                <Image source={tickIcon} style={styles.tick} />
              ) : (
                <>
                  <Avatar size={40} rounded source={queueIcon} />
                  <Text style={styles.overlayTitle}>Add To Queue</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          {playlistOpen && (
            <View
              style={{
                backgroundColor: '#373737',
                position: 'relative',
                flex: 3,
              }}>
              <ScrollView>
                <Text style={styles.overlayHeader}>Your playlists</Text>
                {/* <FlatList
              data="Title"
              keyExtractor={() => randomize('Aa0!', 10)}
              renderItem={({ item }) => {
              return ( */}

                <CheckBox
                  title="Title"
                  iconRight
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxInput}
                  iconType="material"
                  checkedIcon="clear"
                  uncheckedIcon="add"
                  checkedColor="red"
                  checked={checked}
                  onPress={() => {
                    setChecked(!checked);
                    // onAddToPlaylist(item.id, selectedSong);
                  }}
                />
              </ScrollView>
              {/* );
              }}
            /> */}
            </View>
          )}
        </Overlay>
      )}

      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.author}>{author}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => toggleOverlay()}>
            <Image source={plusIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleFavorite}>
            <Image
              source={heartGrayIcon}
              style={favorite ? styles.favoriteIcon : styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
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
    marginVertical: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    flex: 1,
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
  add: {
    resizeMode: 'contain',
    tintColor: 'gray',
    height: 22,
    width: 22,
    alignSelf: 'center',
  },
  overlay: {
    width: '90%',
    backgroundColor: '#212121',
    flex: 0.4,
  },
  playlistOpenOverlay: {
    width: '90%',
    backgroundColor: '#212121',
    flex: 0.8,
  },
  overlayBottom: {
    flex: 1,
    flexDirection: 'row',
  },
  overLayBottomContainer: {
    backgroundColor: '#212121',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(12),
    textAlign: 'center',
    marginTop: RFValue(10),
  },
  tick: {
    resizeMode: 'contain',
    height: RFValue(60),
    width: RFValue(60),
  },
  overlayTop: {
    flex: 1,
  },
  overlayHeader: {
    fontSize: RFValue(18),
    alignSelf: 'center',
    paddingVertical: RFValue(10),
    color: 'white',
  },
  checkboxContainer: {
    backgroundColor: 'black',
    borderWidth: 0,
    paddingVertical: RFValue(10),
  },
  checkboxInput: {
    fontSize: RFValue(16),
    color: 'white',
    marginRight: '70%',
  },
});

export default SongItem;
