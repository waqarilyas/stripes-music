import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EmptyCard = ({ icon, text, buttonTitle, onPress }) => {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.createText}>Create Playlist</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp('3'),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    marginTop: hp('3'),
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: hp('2'),
    textTransform: 'uppercase',
    marginBottom: hp(2),
  },
  icon: {
    height: hp('5'),
    width: hp('5'),
  },
  createText: {
    color: '#e81093',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: RFValue(14),
  },
});

export default EmptyCard;
