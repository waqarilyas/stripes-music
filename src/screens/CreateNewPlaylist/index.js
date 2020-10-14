import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { Formik } from 'formik';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Checkbox from '@react-native-community/checkbox';

import ImagePicker from 'react-native-image-picker';
import { imagePlaceholder, edit } from '../../../Assets/Icons';
import styles from './styles';
import Button from '../../components/Button';
import { CreatePlaylistVS } from '../../utils/Validation';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const initValues = {
  title: '',
};

const CreateNewPlaylist = () => {
  const [fileUri, SetFileuri] = useState(null);
  const [privacy, setPrivacy] = useState(false);

  const chooseImage = () => {
    let options = {
      title: 'Select Playlist Artwork',
      takePhotoButtonTitle: null,
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
      } else {
        SetFileuri(response.uri);
      }
    });
  };

  const createNewPlaylist = (values, action) => {
    const playlist = {
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
      duration: '0H',
      id: '',
      image: fileUri === null ? '' : fileUri,
      isPrivate: privacy,
      songs: [],
      title: values.title,
    };

    console.log(playlist);

    // const title = values.title;
    // const uid = auth().currentUser.uid;
    // firestore().collection('users').doc(uid).collection('playlists').add({
    // })
  };

  return (
    <>
      <View style={styles.overlay}>
        <KeyboardAvoidingView>
          <Text style={styles.overlayHeader}>Create Playlist</Text>
          <Text style={styles.subtitle}>Create a new playlist</Text>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Avatar
                rounded
                source={fileUri === null ? imagePlaceholder : { uri: fileUri }}
                size={heightPercentageToDP('18')}
                containerStyle={{ alignSelf: 'center' }}
                onPress={chooseImage}
              />

              <Text style={styles.optional}>Optional</Text>
              <View style={styles.edit}>
                <Image source={edit} style={styles.imageEdit} />
              </View>
            </TouchableOpacity>
          </View>

          <Formik
            initialValues={initValues}
            onSubmit={(values, actions) => createNewPlaylist(values, actions)}
            validationSchema={CreatePlaylistVS}>
            {({
              initialValues,
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
            }) => (
              <>
                <TextInput
                  placeholder="Playlist Title"
                  placeholderTextColor="#515151"
                  style={styles.input}
                  defaultValue={initialValues.title}
                  onChangeText={handleChange('title')}
                />
                <Text style={styles.error}>
                  {touched.title && errors.title ? errors.title : ''}
                </Text>
                <View style={styles.privacyContainer}>
                  <Checkbox
                    value={privacy}
                    onValueChange={(newValue) => setPrivacy(newValue)}
                    onTintColor="#F5138E"
                    onCheckColor="#F5138E"
                  />
                  <Text style={styles.private}>Private</Text>
                </View>
                <Button
                  text="CREATE"
                  onPress={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default CreateNewPlaylist;
