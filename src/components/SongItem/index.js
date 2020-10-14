import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Button, Overlay, Avatar, CheckBox } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import randomize from 'randomatic';

import { plusIcon, playlist, queueIcon, tickIcon } from '../../../Assets/Icons';
import SongCardListView from '../../components/SongCardListView';

const SongItem = ({
  title,
  author,
  arts,
  duration,
  userPlaylists,
  onAddToPlaylist,
  item,
}) => {
  const [visible, setVisible] = useState(false);
  const [addToQueue, setAddToQueue] = useState(false);
  const [checked, setChecked] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      {visible ? (
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
            arts={arts}
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
          {playlistOpen ? (
            <View
              style={{
                flex: 1,
                backgroundColor: '#373737',
                // height: '30%',
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
          ) : null}
        </Overlay>
      ) : null}

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleOverlay()}>
          <Image source={plusIcon} style={styles.add} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    flex: 1,
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
    height: 22,
    width: 22,
    alignSelf: 'center',
  },
  overlay: {
    // height: '50%',
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
