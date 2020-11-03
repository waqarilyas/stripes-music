import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EmptyCard = ({ icon, text }) => {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: hp('5'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: hp('3'),
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  icon: {
    height: hp('8'),
    width: hp('8'),
  },
});

export default EmptyCard;
