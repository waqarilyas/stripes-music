// Module import

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Image,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Local imports
import { backbutton } from '../../../Assets/Icons';
//import styles from './styles'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const Header = (props) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ height: hp('2%') }} />
      <View style={styles.maincontainer}>
        <View style={styles.subcontainer1}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.TouchView}>
            <Image
              source={backbutton}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.subcontainer2}>
          <Text style={styles.textstyle}>{props.name}</Text>
        </View>
        <View style={{ flex: 0.8 }} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    height: hp('6.5%'),
    flexDirection: 'row',
  },
  subcontainer1: {
    flex: 0.8,
    alignItems: 'center',
  },
  subcontainer2: {
    flex: 4,
    alignItems: 'center',
  },
  textstyle: {
    fontSize: 20,
    color: '#c4c4c4',
    fontWeight: 'bold',
    marginTop: 3,
  },
  TouchView: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: wp('3.5%'),
    height: hp('3.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
