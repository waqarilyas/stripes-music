import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Divider, Overlay, Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import { edit, camera } from '../../../Assets/Icons';
import styles from './styles';

const CreateNewPlaylist = () => {
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

  return (
    <>
      <View style={styles.overlay}>
        <KeyboardAvoidingView>
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
        </KeyboardAvoidingView>
        <Text style={styles.createButton}>Create</Text>
      </View>
    </>
  );
};

export default CreateNewPlaylist;
