import React from 'react';
import { View, Text, Image } from 'react-native';
import { Header } from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import styles from './styles';

const LeftComponent = ({ icon }) => {
  return <Image source={icon} style={styles.leftIcon} />;
};

const SectionHeader = ({ name, icon, onPress }) => {
  return (
    <Header
      placement="left"
      leftComponent={<LeftComponent icon={icon} />}
      centerComponent={{
        text: name,
        style: { color: 'white', fontWeight: 'bold', fontSize: wp('4.5') },
      }}
      rightComponent={
        <View style={styles.background}>
          <Text style={styles.seeAll} onPress={onPress}>
            SEE ALL
          </Text>
        </View>
      }
      containerStyle={styles.containerStyle}
    />
  );
};
export default SectionHeader;
