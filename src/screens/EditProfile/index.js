import React, { useState } from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import { Avatar, Badge } from 'react-native-elements';

import Button from '../../components/Mybutton';
import TextBox from '../../components/TextBox';
import { edit, camera } from '../../../Assets/Icons';

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  var [fileUri, SetFileuri] = useState(null);

  const handleSubmit = () => {
    console.log(fullName);
    console.log(location);
    console.log(bio);
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
    <View style={styles.maincontainer}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.profileTouchView}
            onPress={chooseImage}>
            {fileUri ? (
              <Avatar
                rounded
                source={{ uri: fileUri }}
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
            text="Full Name"
            onChangeText={(input) => setFullName(input)}
            contentType="name"
          />
          <TextBox
            text="Location"
            onChangeText={(input) => setLocation(input)}
            contentType="location"
          />
          <View style={styles.bioContainer}>
            <TextInput
              style={styles.textInputstyle}
              placeholder="Bio"
              placeholderTextColor="#5E5A5E"
              numberOfLines={5}
              multiline
              maxLength={160}
              onChangeText={(input) => setBio(input)}
              defaultValue=""
              textContentType="none"
            />
          </View>
          <Button text="UPDATE PROFILE" onPress={handleSubmit} />
          <View style={{ height: hp('10%') }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#120810',
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
});

export default EditProfile;
