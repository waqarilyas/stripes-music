import React from 'react';
import { Text, View, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
        style: { color: 'white', fontWeight: 'bold', fontSize: wp('4.5') },
      }}
      rightComponent={<RightComponent />}
      containerStyle={styles.containerStyle}
    />
  );
};
export default SectionHeader;
