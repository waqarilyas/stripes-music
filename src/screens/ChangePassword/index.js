import firebase from '@react-native-firebase/app';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { errIcon, tick } from '../../../Assets/Icons';
import Button from '../../components/Mybutton';
import TextBox from '../../components/TextBox';
import styles from './styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';

const ChangePassword = () => {
  const [currentPass, setcurrentPass] = useState('');
  const [newPass, setnewPass] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [visible, setVisible] = useState(false);
  const [matchErr, setMatchErr] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(true);
  const [showNewPass, setShowNewPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);

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
    setLoading(true);
    reauthenticate()
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPass)
          .then(() => {
            setLoading(false);
            console.log('Password updated!');
            setVisible(true);
          })
          .catch((error) => {
            setLoading(false);
            console.log('---Error----', error.message);
          });
      })
      .catch((error) => {
        setLoading(false);
        setWrongPassword(true);
        console.log('----Functionreauthenticate error--', error.message);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#120810' }}>
      <ScrollView>
        <View style={{ height: hp('3%') }} />
        <View style={styles.mainContainer}>
          <TextInput
            style={styles.textInput}
            blurOnSubmit={true}
            secureTextEntry={showCurrentPass}
            placeholder={'Enter current password'}
            onChangeText={(input) => setcurrentPass(input)}
            maxLength={20}
          />
          {currentPass.length > 0 && (
            <TouchableOpacity
              onPressIn={() => setShowCurrentPass(false)}
              onPressOut={() => setShowCurrentPass(true)}>
              <FeatherIcon name="eye" color="#000" size={20} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.mainContainer}>
          <TextInput
            style={styles.textInput}
            blurOnSubmit={true}
            secureTextEntry={showNewPass}
            placeholder={'Enter new password'}
            onChangeText={(input) => setnewPass(input)}
            maxLength={20}
          />

          {newPass.length > 0 && (
            <TouchableOpacity
              onPressIn={() => setShowNewPass(false)}
              onPressOut={() => setShowNewPass(true)}>
              <FeatherIcon name="eye" color="#000" size={20} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.mainContainer}>
          <TextInput
            style={styles.textInput}
            blurOnSubmit={true}
            secureTextEntry={showConfirmPass}
            placeholder={'Re-enter new password'}
            onChangeText={(input) => setconfirmPass(input)}
            maxLength={20}
          />
          {confirmPass.length > 0 && (
            <TouchableOpacity
              onPressIn={() => setShowConfirmPass(false)}
              onPressOut={() => setShowConfirmPass(true)}>
              <FeatherIcon name="eye" color="#000" size={20} />
            </TouchableOpacity>
          )}
        </View>

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

        <Button
          text="CHANGE PASSWORD"
          onPress={handleSubmit}
          loading={loading}
        />
        <View style={{ height: hp('10%') }} />
      </ScrollView>
      <View style={{ height: hp('30%') }} />
    </View>
  );
};

export default ChangePassword;
