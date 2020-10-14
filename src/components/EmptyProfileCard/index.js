import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EmptyCard = ({ icon, text, buttonTitle, onPress }) => {
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
    width: '100%',
    paddingVertical: hp('4'),
    justifyContent: 'center',
    alignItems: 'center',
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
    height: hp('6'),
    width: hp('6'),
  },
});

export default EmptyCard;
