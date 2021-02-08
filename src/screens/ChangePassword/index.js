import firebase from '@react-native-firebase/app';
import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Modal,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { errIcon, tick } from '../../../Assets/Icons';
import Button from '../../components/Mybutton';
import styles from './styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';

const ChangePassword = ({ navigation }) => {
  const [currentPass, setcurrentPass] = useState('');
  const [newPass, setnewPass] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [matchErr, setMatchErr] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(true);
  const [showNewPass, setShowNewPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const currentPassRef = useRef();
  const newPassRef = useRef();
  const confirmPassRef = useRef();

  useEffect(() => {
    if (emptyFieldError) {
      setTimeout(() => {
        setEmptyFieldError(false);
      }, 2000);
    }
    if (matchErr) {
      setTimeout(() => {
        setMatchErr(false);
      }, 2000);
    }
    if (wrongPassword) {
      setTimeout(() => {
        setWrongPassword(false);
      }, 2000);
    }
    if (passwordUpdated) {
      setTimeout(() => {
        setPasswordUpdated(false);
        currentPassRef.current.clear();
        newPassRef.current.clear();
        confirmPassRef.current.clear();
        navigation.goBack();
      }, 3000);
    }
  }, [emptyFieldError, matchErr, wrongPassword, passwordUpdated]);

  const handleSubmit = () => {
    

    if (currentPass === '' || newPass == '' || confirmPass == '') {
      setEmptyFieldError(true);
    } else if (newPass !== confirmPass) {
      setMatchErr(true);
    } else if (newPass === confirmPass) {
      setMatchErr(false);
      setNewPassword();
    }
  };

  const user = firebase.auth().currentUser;



  const reauthenticate = () => {
    var user = firebase.auth().currentUser;

    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPass,
    );
    return user.reauthenticateWithCredential(cred);
  };

  const setNewPassword = () => {

    setLoading(true);
    reauthenticate()
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPass)
          .then(() => {
            setLoading(false);

            setPasswordUpdated(true);
          })
          .catch((error) => {
            setLoading(false);

          });
      })
      .catch((error) => {
        setLoading(false);
        setWrongPassword(true);

      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#120810' }}>
      <ScrollView>
        <View style={{ height: hp('3%') }} />
        <View style={styles.mainContainer}>
          <TextInput
            ref={currentPassRef}
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
            ref={newPassRef}
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
            ref={confirmPassRef}
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
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={
            wrongPassword || emptyFieldError || matchErr || passwordUpdated
          }>
          <View style={styles.modalMainContainer}>
            <View style={styles.postContainer}>
              <Image
                source={passwordUpdated ? tick : errIcon}
                style={styles.successImage}
              />
              {wrongPassword && (
                <Text style={styles.textStyle}>
                  Current Password is not correct!
                </Text>
              )}
              {emptyFieldError && (
                <Text style={styles.textStyle}>
                  Please fill all the fields!
                </Text>
              )}
              {matchErr && (
                <Text style={styles.textStyle}>Passwords don't match!</Text>
              )}
              {passwordUpdated && (
                <Text style={styles.textStyle}>
                  Password updated successfully!
                </Text>
              )}
            </View>
          </View>
        </Modal>

        <Button
          text="CHANGE PASSWORD"
          onPress={handleSubmit}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};

export default ChangePassword;
