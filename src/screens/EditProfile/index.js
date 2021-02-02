import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';

import { camera, edit, usernameIcon } from '../../../Assets/Icons';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { getUser } from '../../Redux/Reducers/firebaseSlice';
import { displayToast } from '../../utils/Helpers';
import { ActivityIndicator } from 'react-native';

const options = {
  title: 'Select Avatar',
  cameraType: 'front',
  mediaType: 'photo',
  maxWidth: 800,
  maxHeight: 800,
  allowsEditing: true,
  quality: 1,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const EditProfile = ({ navigation, route }) => {
  const { profilePicture } = route.params;
  const uid = auth().currentUser.uid;
  const { user } = useSelector((state) => state.root.firebase);
  const [ext, setExt] = useState(null);
  const [fileUri, setFileUri] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);
  const dispatch = useDispatch();

  const chooseImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setFileUri(decodeURI(response.uri));
        const type = response.type.split('/');
        setExt(type[1]);
      }
    });
  };

  const handleForm = ({ name }) => {
    setLoading(true);
    if (fileUri) {
      updatePicture(name);
    } else if (name !== user?.fullName) {
      updateDB(name);
    }
  };

  const updatePicture = (name) => {
    const storageRef = storage().ref('users/');
    const path = `${uid}/${name}.${ext}`;

    const uploadTask = storageRef.child(path).putFile(fileUri);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case storage.TaskState.PAUSED:
            console.log('Upload is paused');
            setLoading(false);
            break;
          case storage.TaskState.CANCELLED:
            console.log('Upload is cancelled');
            setLoading(false);
            break;
          case storage.TaskState.ERROR:
            console.log('Failed to create a playlist. Try again.');
            setLoading(false);
            break;
          case storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      }, // Failed Listener
      (_err) => {
        console.log('Error: ', _err);
        setLoading(false);
      }, // Successful Listener
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadUrl) => updateDB(name, downloadUrl));
      },
    );
  };

  const updateDB = (name = user?.fullName, imageURI = user?.profilePicture) => {
    firestore()
      .collection('users')
      .doc(uid)
      .update({
        profilePicture: imageURI,
        fullName: name,
      })
      .then(() => {
        dispatch(getUser());
        displayToast('Profile Updated');
        navigation.goBack();
      })
      .catch((err) => {
        setLoading(false);
        console.log('Error updating user', err);
      });
  };

  const switchColors = { false: '#767577', true: '#36E76E' };

  const initialValues = {
    name: user?.fullName,
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.profileTouchView}
              onPress={chooseImage}>
              <Image
                defaultSource={camera}
                resizeMode={
                  fileUri || user?.profilePicture ? 'contain' : 'center'
                }
                style={styles.profilePicture}
                onPress={chooseImage}
                source={{
                  uri: fileUri || profilePicture,
                }}
                PlaceholderContent={<ActivityIndicator color={'white'} />}
                placeholderStyle={styles.placeholderStyle}
              />
              <View style={styles.edit}>
                <Image source={edit} style={styles.imageEdit} />
              </View>
            </TouchableOpacity>
          </View>

          <Formik initialValues={initialValues} onSubmit={handleForm}>
            {({
              initialValues,
              errors,
              handleChange,
              handleSubmit,
              touched,
            }) => (
              <View>
                <Input
                  icon={usernameIcon}
                  name={'Full Name'}
                  textType={'name'}
                  capitalize={'words'}
                  defaultValue={initialValues.name}
                  onChangeText={handleChange('name')}
                  autoCompleteType={'name'}
                  returnKeyType={'done'}
                />
                <Text style={styles.error}>
                  {touched.name && errors.name ? errors.name : ''}
                </Text>

                <View style={styles.notificationContainer}>
                  <Text style={styles.notifyText}>Notifications</Text>
                  <Switch
                    trackColor={switchColors}
                    thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
                    ios_backgroundColor={'#3e3e3e'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={styles.switch}
                  />
                </View>

                <Button text={'Update Profile'} onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </ScrollView>
        <Spinner visible={loading} color={'white'} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#120810',
    flex: 1,
    paddingHorizontal: wp(4),
  },
  error: {
    color: '#B22222',
    marginVertical: hp('1'),
    marginLeft: hp('1'),
  },
  profileContainer: {
    height: hp('25%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bioContainer: {
    height: hp('13%'),
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    marginVertical: hp('2%'),
  },
  edit: {
    alignItems: 'flex-end',
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  camera: {
    alignItems: 'center',
    resizeMode: 'contain',
    height: hp('5'),
    width: hp('5'),
  },
  imageEdit: {
    height: hp('4.4%'),
    width: hp('4.4%'),
  },
  cameraImage: {
    resizeMode: 'contain',
    height: hp('14'),
    width: hp('14'),
  },
  cameraIconContainer: {
    height: hp('14'),
    width: hp('14'),
    alignItems: 'center',
    backgroundColor: 'grey',
    justifyContent: 'center',
    borderRadius: hp('10'),
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    backgroundColor: 'red',
    paddingVertical: hp('3'),
    backgroundColor: '#1a1a1a',
    marginTop: hp(1),
  },
  notifyText: {
    color: 'white',
    fontSize: RFValue(18),
    marginStart: wp(3),
  },
  switch: {
    marginEnd: wp(3),
  },
  profilePicture: {
    height: hp(18),
    width: hp(18),
    borderRadius: 100,
  },
  placeholderStyle: {
    backgroundColor: '#212121',
  },
});

export default EditProfile;
