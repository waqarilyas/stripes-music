import firebase from '@react-native-firebase/app';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP
} from 'react-native-responsive-screen';
import { errIcon, tick } from '../../../Assets/Icons';
import Button from '../../components/Mybutton';
import TextBox from '../../components/TextBox';

const ChangePassword = () => {
  const [currentPass, setcurrentPass] = useState('');
  const [newPass, setnewPass] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [visible, setVisible] = useState(false);
  const [matchErr, setMatchErr] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    console.log(currentPass);
    console.log(newPass);
    console.log(confirmPass);

    if (currentPass === '' || newPass == '' || confirmPass == '') {
      setEmptyFieldError(true);
      return;
    }

    if (newPass !== confirmPass) {
      setMatchErr(true);
      return;
    } else if (newPass === confirmPass) {
      setMatchErr(false);
    }

    setNewPassword();
  };
  var user = firebase.auth().currentUser;

  console.log('-----usr---', user);

  const reauthenticate = () => {
    var user = firebase.auth().currentUser;

    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPass,
    );
    return user.reauthenticateWithCredential(cred);
  };

  const setNewPassword = () => {
    console.log(currentPass, '---------', newPass);
    setLoading(true)
    reauthenticate()
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPass)
          .then(() => {
            setLoading(false)
            console.log('Password updated!');
            setVisible(true);
          })
          .catch((error) => {
            setLoading(false)
            console.log('---Error----', error.message);
          });
      })
      .catch((error) => {
        setLoading(false)
        setWrongPassword(true);
        console.log('----Functionreauthenticate error--', error.message);
      });
  };

  return (
    <View style={{ backgroundColor: '#120810' }}>
      <ScrollView>
        <View style={{ height: hp('3%') }} />

        <TextBox
          blurOnSubmit={true}
          text="Enter current password"
          onChangeText={(input) => setcurrentPass(input)}
          contentType="password"
        />
        <TextBox
          blurOnSubmit={true}
          text="Enter new password"
          onChangeText={(input) => setnewPass(input)}
          contentType="password"
        />
        <TextBox
          blurOnSubmit={true}
          text="Re-enter new password"
          onChangeText={(input) => setconfirmPass(input)}
          contentType="password"
        />

        {wrongPassword ? (
          <View style={styles.postContainer}>
            <Image source={errIcon} style={styles.successImage} />
            <Text style={styles.textStyle}>Wrong Password!</Text>
          </View>
        ) : null}

        {emptyFieldError ? (
          <View style={styles.postContainer}>
            <Image source={errIcon} style={styles.successImage} />
            <Text style={styles.textStyle}>Please fill all the fields!</Text>
          </View>
        ) : null}

        {matchErr ? (
          <View style={styles.postContainer}>
            <Image source={errIcon} style={styles.successImage} />
            <Text style={styles.textStyle}>Passwords don't match!</Text>
          </View>
        ) : null}

        {visible ? (
          <View style={styles.postContainer}>
            <Image source={tick} style={styles.successImage} />
            <Text style={styles.textStyle}>Password updated successfully!</Text>
          </View>
        ) : null}



        <Button text="CHANGE PASSWORD" onPress={handleSubmit} loading={loading} />
        <View style={{ height: hp('10%') }} />
      </ScrollView>
      <View style={{ height: hp('30%') }} />
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#c4c4c4',
    marginLeft: widthPercentageToDP('2%'),
    fontSize: 12,
  },
  successImage: {
    resizeMode: 'contain',
    height: hp('4'),
    width: hp('4'),
  },
});

export default ChangePassword;
