import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { camera, edit, tickIcon } from '../../../Assets/Icons';
import Button from '../../components/Mybutton';
import TextBox from '../../components/TextBox';
// import fileType from 'react-native-file-type';
import { getUser } from '../../Redux/Reducers/firebaseSlice';

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uploadErr, setUploadErr] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [ext, setExt] = useState('');
  var [fileUri, SetFileuri] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.firebase.user);
  const uid = auth().currentUser.uid;

  const handleSubmit = () => {
    setLoading(true);
    console.log(fullName);

    user.fullName === fullName || fullName === ''
      ? setFullName(user.fullName)
      : null;

    updateProfiledata();
  };

  const chooseImage = () => {
    let options = {
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

    ImagePicker.showImagePicker(options, (response) => {
      // console.log(response.uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        SetFileuri(decodeURI(response.uri));
        const type = response.type.split('/');
        setExt(type[1]);
      }
    });
  };
  const updateProfiledata = () => {
    if (fileUri) {
      uploadImageToStorage(fullName);
      dispatch(getUser());
    } else {
      uploadDataToFirestore(fullName);
      dispatch(getUser());
    }
  };

  const uploadImageToStorage = (title) => {
    const storageRef = storage().ref('users/');
    const path = `${uid}/${user.fullName}.${ext}`;

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
            console.log('Upload is cancelled');
            break;
          case storage.TaskState.ERROR:
            console.log('Failed to create a playlist. Try again.');

            break;
          case storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      }, // Failed Listener
      (_err) => {
        console.log('Error: ', _err);
      }, // Successful Listener
      () => {
        console.log('------ SUCCESSFULLY UPLOADED PICTURE ------');
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          setVisible(true);
          console.log('File available at', downloadUrl);
          uploadDataToFirestore(title, downloadUrl);
          setLoading(false);
        });
      },
    );
  };

  const uploadDataToFirestore = (title, imageUrl = user.profilePicture) => {
    firestore()
      .collection('users')
      .doc(uid)
      .set(
        {
          profilePicture: imageUrl,
          fullName: title,
        },
        {
          merge: true,
        },
      )
      .then((res) => {
        dispatch(getUser());
        setVisible(true);
        setLoading(false);
        z;
      });
  };

  if (visible) {
    setInterval(function () {
      setVisible(false);
    }, 3000);
  }
  return (
    <>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}>
        <View style={styles.overlayContainer}>
          <Image source={tickIcon} style={styles.tick} />
          <Text style={styles.successMessage}>
            Profile updated successfully!
          </Text>
        </View>
      </Overlay>

      <View style={styles.maincontainer}>
        <ScrollView>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.profileTouchView}
              onPress={chooseImage}>
              {fileUri || user.profilePicture ? (
                <Avatar
                  rounded
                  source={
                    fileUri ? { uri: fileUri } : { uri: user.profilePicture }
                  }
                  size="xlarge"
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

          <View>
            <TextBox
              text="Enter Name"
              defaultValue={user.fullName}
              onChangeText={(input) => setFullName(input)}
              contentType="name"
            />

            <View style={styles.notificationContainer}>
              <Text style={styles.notifyText}>Notifications</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#36E76E' }}
                thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              {/* </View> */}
            </View>

            <Button
              text="UPDATE PROFILE"
              onPress={handleSubmit}
              loading={loading}
            />
            <View style={{ height: hp('10%') }}></View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#120810',
    flex: 1,
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
  textInputstyle: {
    height: hp('15%'),
    backgroundColor: '#2c262b',
    fontSize: 14,
    width: wp('90%'),
    borderRadius: 5,
    color: 'white',
    paddingLeft: 15,
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
  notifyText: {
    color: 'white',
    fontSize: RFValue('16'),
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
    marginVertical: hp('2'),
    paddingHorizontal: hp('4'),
  },
  overlay: {
    backgroundColor: '#BBF5BB',
    width: '80%',
    paddingVertical: hp('3'),
    alignItems: 'center',
    borderRadius: 10,
  },
  successMessage: {
    color: 'black',
    fontSize: RFValue('14'),
  },
  overlayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // width: '100%',
  },
  tick: {
    alignItems: 'center',
    resizeMode: 'contain',
    height: hp('4'),
    width: hp('4'),
    marginRight: hp('2'),
  },
});

export default EditProfile;
