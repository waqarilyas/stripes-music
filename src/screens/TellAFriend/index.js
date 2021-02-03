import React, { useState } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { Image, Share, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { copy } from '../../../Assets/Icons';

const TellaFriend = () => {
  const [shareText, setShareText] = useState(
    'Hey you might wanna check this app out',
  );

  // const copyToClipboard = () => {
  //   Clipboard.setString(shareText);
  // };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          Platform.OS === 'android'
            ? shareText + ' https://www.google.com'
            : shareText,
        url: 'https://apps.apple.com/us/app/stripes-app/id1538914059',
        title: 'Share Stripes',
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
        <Text style={styles.textStyle}>Sharing Message</Text>
        {/* <Text style={styles.textStyle1}>Tab to copy the link.</Text> */}
        <View style={styles.container}>
          <View style={{ flex: 6 }}>
            <TextInput
              // textContentType="URL"
              placeholder=""
              onChangeText={(text) => setShareText(text)}
              defaultValue="Hey you might wanna check this app out"
              placeholderTextColor="#8B868A"
              style={{ color: '#8B868A', fontSize: 16, padding: 12 }}
              multiline={true}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Text style={styles.shareButtonText}>SHARE</Text>
        </TouchableOpacity>
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
  shareButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});
export default TellaFriend;
