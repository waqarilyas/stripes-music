import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import { tick } from '../../../Assets/Icons';
import Header from '../../components/Header';
import Button from '../../components/Mybutton';
import TextBox from '../../components/TextBox';

const ChangePassword = () => {
  const [currentPass, setcurrentPass] = useState('');
  const [newPass, setnewPass] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    console.log(currentPass);
    console.log(newPass);
    console.log(confirmPass);
    setVisible(true);
  };
  return (
    <View style={{ backgroundColor: '#120810' }}>
      <ScrollView>
        <View style={{ height: hp('3%') }} />
        <TextBox
          text="Enter current password"
          onChangeText={(input) => setcurrentPass(input)}
          contentType="password"
        />
        <TextBox
          text="Enter new password"
          onChangeText={(input) => setnewPass(input)}
          contentType="password"
        />
        <TextBox
          text="Re-enter new password"
          onChangeText={(input) => setconfirmPass(input)}
          contentType="password"
        />
        <Button text="CHANGE PASSWORD" onPress={handleSubmit} />
        {visible ? (
          <View style={styles.postContainer}>
            <Image source={tick} style={{ marginTop: hp('0.5%') }} />
            <Text style={styles.textStyle}>Password updated successfully</Text>
          </View>
        ) : null}
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
  },
  textStyle: {
    color: '#c4c4c4',
    marginLeft: widthPercentageToDP('2%'),
    fontSize: 12,
  },
});

export default ChangePassword;
