// Module imports

import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Switch,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button, Overlay } from 'react-native-elements';

// Local imports
import ItemBox from '../ItemBox';
import { signout } from '../../../Assets/Icons';
import { useNavigation } from '@react-navigation/native';
//import styles from './styles'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Dialog = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [switchValue, setSwitchValue] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleSwitch = (value) => {
    setSwitchValue(!switchValue);
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onBackdropPress={toggleSwitch}>
        <View style={styles.background} />
        <View style={styles.positioner}>
          <View style={{ flex: 5 }} />
          <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <ItemBox
              text="Edit Profile"
              onPress={() => {
                setModalVisible(false) || navigation.navigate('EditProfile');
              }}
            />
            <ItemBox
              text="Edit Subscription"
              onPress={() => {
                setModalVisible(false) ||
                  navigation.navigate('Subscriptions', { check: false });
              }}
            />
            <ItemBox
              text="Tell a Friend"
              onPress={() => {
                setModalVisible(false) || navigation.navigate('TellAFriend');
              }}
            />
            <ItemBox
              text="Change Password"
              onPress={() => {
                setModalVisible(false) || navigation.navigate('ChangePassword');
              }}
            />
            <View style={styles.maincontainer}>
              <Text style={styles.Textstyle}>Notification</Text>
              <Switch
                trackColor={{ false: '#c4c4c4', true: '#36e76e' }}
                thumbColor={'white'}
                onValueChange={toggleSwitch}
                value={switchValue}
              />
            </View>
            <View style={styles.SignoutContainer}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Image source={signout} style={styles.imagestyle} />
                <Text style={styles.Textstyle1}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 10 }}></View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text>open</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#cacbc9',
    width: wp('100%'),
    height: hp('100%'),
    opacity: 0.9,
  },
  positioner: {
    position: 'absolute',
    flex: 1,
    borderWidth: 1,
    width: wp('100%'),
    height: hp('100%'),
    // backgroundColor: 'transparent',
  },
  container: {
    flex: 16,
    backgroundColor: '#212121',
    borderRadius: 5,
    marginLeft: deviceWidth / 21,
    marginRight: deviceWidth / 24,
    width: deviceWidth / 1.1,
    alignItems: 'center',
  },
  maincontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: wp('75%'),
    flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  Textstyle: {
    color: '#c4c4c4',
    fontSize: 14,
    fontWeight: 'bold',
  },
  Textstyle1: {
    color: '#c4c4c4',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 7,
  },
  SignoutContainer: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagestyle: {
    marginLeft: wp('2.5%'),
    width: wp('7%'),
    height: wp('7%'),
    tintColor: 'white',
  },
});

export default Dialog;
