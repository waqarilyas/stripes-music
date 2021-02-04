import Checkbox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { heightPercentageToDP } from 'react-native-responsive-screen';

import { imagePlaceholder } from '../../../Assets/Icons';
import Button from '../../components/Button';
import { CreatePlaylistVS } from '../../utils/Validation';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { backIcon } from '../../../Assets/Icons';

const initValues = {
  title: '',
  err: '',
};

const CreateNewPlaylist = ({ navigation, route }) => {
  const [fileUri, setFileuri] = useState(null);
  const [ext, setExt] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const uid = auth().currentUser?.uid;
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerLeft: () => back() });
  }, [navigation]);

  const back = () => {
    return (
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => {
          if (route.params) {
            route.params.switchMode('fullscreen');
          }
          navigation.goBack();
        }}>
        <Image source={backIcon} style={styles.back} />
      </TouchableOpacity>
    );
  };

  const chooseImage = () => {
    const options = {
      title: 'Select Playlist Artwork',
      takePhotoButtonTitle: null,
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 1,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const splittedUri = response.uri.split('.');
        const extension = splittedUri[splittedUri.length - 1];
        setExt(extension);
        setFileuri(decodeURI(response.uri));
      }
    });
  };

  const createNewPlaylist = (values, action) => {
    const title = values.title;
    const finalTitle = title.toLowerCase().split(' ').join('-');

    if (fileUri) {
      uploadImageToStorage(finalTitle, title, action);
    } else {
      uploadDataToFirestore(title);
    }
  };

  const uploadImageToStorage = (finalTitle, title, action) => {
    const storageRef = storage().ref('users/');
    const path = `${uid}/playlists/${finalTitle}/${finalTitle}.${ext}`;
    const uploadTask = storageRef.child(path).putFile(fileUri);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case storage.TaskState.CANCELLED:
          case storage.TaskState.ERROR:
            action.setSubmitting(false);
            action.setErrors({
              err: 'Failed to create a playlist. Try again.',
            });
            break;
          case storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      }, // Failed Listener
      (_err) => {
        action.setSubmitting(false);
        action.setErrors({
          err: 'Failed to create a playlist. Try again.',
        });
      }, // Successful Listener
      () => {
        console.log('------ SUCCESSFULLY UPLOADED PICTURE ------');
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          console.log('File available at', downloadUrl);
          uploadDataToFirestore(title, downloadUrl);
        });
      },
    );
  };

  const uploadDataToFirestore = (title, imageUrl = '') => {
    const playlist = {
      createdAt: +new Date(),
      updatedAt: +new Date(),
      duration: '0H',
      id: '',
      image: imageUrl,
      isPrivate: privacy,
      songs: [],
      title,
      viewCount: privacy ? null : 0,
    };

    firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .add(playlist)
      .then((ref) => {
        ref.set(
          {
            id: ref.id,
          },
          { merge: true },
        );
      })
      .then(() => {
        if (route.params) {
          route.params.switchMode('fullscreen');
        }
        navigation.goBack();
      });
  };

  return (
    <>
      <View style={styles.overlay}>
        <KeyboardAvoidingView>
          <Text style={styles.overlayHeader}>Create New Playlist</Text>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Avatar
                rounded
                source={fileUri === null ? imagePlaceholder : { uri: fileUri }}
                size={heightPercentageToDP('18')}
                containerStyle={{ alignSelf: 'center' }}
                onPress={chooseImage}
              />
              <Text style={styles.optional}>
                Select Profile Picture (Optional)
              </Text>
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
                    tintColors={{ true: '#F5138E', false: '#fff' }}
                    boxType={'circle'}
                    tintColor={'#fff'}
                    onCheckColor="#F5138E"
                  />
                  <Text style={styles.private}>Private</Text>
                </View>
                <Button
                  text="CREATE"
                  onPress={handleSubmit}
                  isSubmitting={isSubmitting}
                />
                <Text style={styles.error}>
                  {touched.err && errors.err ? errors.err : ''}
                </Text>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default CreateNewPlaylist;
