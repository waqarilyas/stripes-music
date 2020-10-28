import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Header from '../../components/Header';
import Button from '../../components/Mybutton';
import { copy } from '../../../Assets/Icons';

const TellaFriend = () => {
  const copyToClipboard = () => {
    Clipboard.setString('hello world');
  };
  return (
    <View style={styles.mainContainer}>
      <View style={{ width: wp('90%') }}>
        <Text style={styles.textStyle}>
          Tell your friends about this amazing app.
        </Text>
        <Text style={styles.textStyle1}>Tab to copy the link.</Text>
        <View style={styles.container}>
          <View style={{ flex: 6 }}>
            <TextInput
              textContentType="URL"
              placeholder=""
              defaultValue="checking123"
              placeholderTextColor="#8B868A"
              editable={false}
              style={{ color: '#8B868A' }}
            />
          </View>
          <View style={styles.subcontainer}>
            <TouchableOpacity
              onPress={() => {
                copyToClipboard();
              }}>
              <Image source={copy} style={styles.copy} />
            </TouchableOpacity>
          </View>
        </View>
        <Button text="SHARE" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#120810',
    alignItems: 'center',
    height: hp('100%'),
  },
  textStyle1: {
    color: '#8B868A',
    marginTop: hp('3%'),
  },
  container: {
    backgroundColor: '#3D353B',
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: hp('1%'),
  },
  textStyle: {
    fontWeight: 'bold',
    color: '#c4c4c4',
    marginTop: hp('3%'),
  },
  subcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copy: {
    width: wp('4%'),
    height: wp('4%)'),
  },
});
export default TellaFriend;
