import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EmptyArtistProfileCard = ({ icon, text, buttonTitle, onPress }) => {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
      <Button title={buttonTitle} onPress={onPress} color="#e81093" />
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
    marginBottom: hp('1'),
  },
  icon: {
    height: hp('8'),
    width: hp('8'),
  },
});

export default EmptyArtistProfileCard;
