import React from 'react';
import { Text, View, Image } from 'react-native';
import { Header } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';

const LeftComponent = ({ icon }) => {
  return <Image source={icon} style={styles.leftIcon} />;
};

const RightComponent = () => {
  return (
    <View style={styles.right}>
      <Text style={styles.rightText}>SEE ALL</Text>
    </View>
  );
};
const SectionHeader = ({ name, icon }) => {
  return (
    <Header
      placement="left"
      leftComponent={<LeftComponent icon={icon} />}
      centerComponent={{
        text: name,
        style: { color: '#fff', fontWeight: 'bold', fontSize: wp('5') },
      }}
      rightComponent={<RightComponent />}
      containerStyle={{
        backgroundColor: 'black',
        justifyContent: 'space-around',
        marginBottom: hp('1'),
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      }}
    />
  );
};
export default SectionHeader;
