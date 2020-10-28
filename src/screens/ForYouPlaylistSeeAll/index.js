import React, { useEffect, useReducer, useState } from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import { Divider, Overlay, Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import { edit, camera } from '../../../Assets/Icons';
import styles from './styles';
import Block from '../../components/Block';
import ForYouPlaylistCard from '../../components/ForYouPlaylistCard';
import { getCollections } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import randomize from 'randomatic';

const initialState = {
  playlists: [],
};

const ForYouPlaylistSeeAll = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [visible, setVisible] = useState(false);
  var [fileUri, SetFileuri] = useState(null);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const chooseImage = () => {
    let options = {
      title: 'Select Avatar',
      cameraType: 'front',
      mediaType: 'photo',
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log(response.uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        SetFileuri(response.uri);
      }
    });
  };

  useEffect(() => {
    getCollections('playlists', (collection) => {
      dispatch({ playlists: collection });
    });
  }, []);

  return (
    <Block>
      {/* <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
        ListEmptyComponent={() => <ActivityIndicator color="black" />}
        backdropStyle={{ backgroundColor: 'transparent' }}>
        <Text style={styles.overlayHeader}>Create Playlist</Text>
        <Text style={styles.subtitle}>
          Enter your playlist name and select avatar
        </Text>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={chooseImage}>
            {fileUri ? (
              <Avatar
                rounded
                source={{ uri: fileUri }}
                size={100}
                containerStyle={{ alignSelf: 'center' }}
                onPress={chooseImage}
              />
            ) : (
              <View style={styles.cameraIconContainer}>
                <Image source={camera} style={styles.camera} />
              </View>
            )}
            <View style={styles.edit}>
              <Image source={edit} style={styles.imageEdit} />
            </View>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Enter Playlist name here"
          placeholderTextColor="gray"
          textAlign="center"
        />

        <Text style={styles.createButton}>Create</Text>
      </Overlay> */}

      <Text style={styles.titleText}>
        A collection of playlists recommended just for you. We hope you like it!
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateNewPlaylist')}>
        <Text style={styles.createNewPlaylist}>Create New Playlist</Text>
      </TouchableOpacity>
      <FlatList
        data={state.playlists}
        keyExtractor={() => randomize('Aa10!', 10)}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item: { image, title, duration, author } }) => {
          return (
            <ForYouPlaylistCard
              image={image}
              title={title}
              duration={duration}
              author={author}
            />
          );
        }}
      />
    </Block>
  );
};

export default ForYouPlaylistSeeAll;
