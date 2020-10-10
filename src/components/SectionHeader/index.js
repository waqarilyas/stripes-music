import React from 'react';
import { View, Text, Image } from 'react-native';
import { Header } from 'react-native-elements';

import styles from './styles';

const LeftComponent = ({ icon }) => {
  return <Image source={icon} style={styles.leftIcon} />;
};

const SectionHeader = ({ name, icon, onPress, isRequired = true }) => {
  return (
    <Header
      placement="left"
      leftComponent={<LeftComponent icon={icon} />}
      centerComponent={{
        text: name,
        style: styles.centerComponent,
      }}
      rightComponent={
        isRequired ? (
          <View style={styles.background}>
            <Text style={styles.seeAll} onPress={onPress}>
              SEE ALL
            </Text>
          </View>
        ) : null
      }
      containerStyle={styles.containerStyle}
    />
  );
};
export default SectionHeader;
