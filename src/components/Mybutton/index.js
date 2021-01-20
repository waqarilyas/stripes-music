// Module imports

import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Button = ({ onPress, text, loading }) => {
  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <TouchableOpacity style={styles.touchView} onPress={onPress}>
          <Text style={styles.textStyle}> {text} </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: hp('7%'),
    marginBottom: hp('3%'),
    backgroundColor: '#29cc5c',
    height: hp('6%'),
    alignSelf: 'center',
    width: wp('50%'),
    borderRadius: 12,
    justifyContent: 'center',
  },
  touchView: {
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Button;
