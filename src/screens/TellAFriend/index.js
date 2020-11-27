import Clipboard from '@react-native-community/clipboard';
import React from 'react';
import { Image, Share, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { copy } from '../../../Assets/Icons';

const TellaFriend = () => {
  const copyToClipboard = () => {
    Clipboard.setString('hello world');
  };

  const onShare = async () => {
    console.log('----Function called-----');
    try {
      const result = await Share.share({
        message: 'Hey you might wanna check this app out',
        title: 'Stripes',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
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
              defaultValue="Hey you might wanna check this app out"
              placeholderTextColor="#8B868A"
              style={{ color: '#8B868A', fontSize:16, padding:12 }}
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
        <Text style={styles.shareButton} onPress={() => onShare()}>
          SHARE
        </Text>
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
  shareButton: {
    color: 'white',
    alignSelf: 'center',
    backgroundColor: 'grey',
    marginTop: '12%',
    paddingHorizontal: hp('4'),
    paddingVertical: hp('1'),
    borderRadius: hp('1'),
  },
});
export default TellaFriend;
