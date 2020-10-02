import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from './styles.js';
import { menuIcon } from '../../../Assets/Icons';

const TabsMainHeader = ({ navigation, name }) => {
  const LeftComponent = () => {
    return (
      // <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Image source={menuIcon} />
      // </TouchableOpacity>
    );
  };

  return (
    <Header
      placement="left"
      leftComponent={<LeftComponent />}
      centerComponent={{
        text: name,
        style: { color: 'white', fontWeight: 'bold', fontSize: hp('3') },
      }}
      rightComponent={{ icon: 'search', color: '#fff', size: hp('4') }}
      containerStyle={styles.headerContainer}
      leftContainerStyle={{ marginLeft: hp('1') }}
      rightContainerStyle={{ marginRight: hp('1') }}
    />
  );
};

export default TabsMainHeader;
