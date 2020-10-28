import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { tick2 } from '../../../Assets/Icons';

const Entity = ({ text }) => {
  return (
    <View style={styles.postContainer}>
      <Image source={tick2} style={styles.imageStyle} />
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    marginVertical: hp('1.5%'),
  },
  textStyle: {
    color: '#c4c4c4',
    fontWeight: 'bold',
    marginLeft: wp('2%'),
    fontSize: 12,
  },
  imageStyle: {
    marginTop: hp('0.5%'),
    marginLeft: wp('1.2%'),
  },
});

export default Entity;
