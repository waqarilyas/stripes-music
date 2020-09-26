import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Header } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles.js';
import { menuIcon } from '../../../Assets/Icons';
const TabsMainHeader = ({ navigation, name }) => {
  const LeftComponent = () => {
    return (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={menuIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <Header
      placement="left"
      leftComponent={<LeftComponent />}
      centerComponent={{
        text: name,
        style: { color: '#fff', fontWeight: 'bold', fontSize: hp('3') },
      }}
      rightComponent={{ icon: 'search', color: '#fff', size: hp('4.5') }}
      containerStyle={{
        backgroundColor: 'black',
        justifyContent: 'space-around',
        marginVertical: hp('1'),
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      }}
    />
  );
};

export default TabsMainHeader;
