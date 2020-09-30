import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Header } from 'react-native-elements';

import styles from './styles';

const LeftComponent = ({ icon }) => {
  return <Image source={icon} style={styles.leftIcon} />;
};

const RightComponent = ({ navigateTo, navigation, icon }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
      <View style={styles.right}>
        <Image source={icon} style={styles.leftIcon} />
        <Image source={icon} style={styles.leftIcon} />
      </View>
    </TouchableOpacity>
  );
};
const MusicPlayerFullScreenHeader = ({
  name,
  icon,
  navigation,
  navigateTo,
}) => {
  return (
    <Header
      placement="left"
      leftComponent={<LeftComponent icon={icon} />}
      centerComponent={{
        text: name,
        style: { color: '#fff', fontWeight: 'bold', fontSize: 24 },
      }}
      rightComponent={
        <RightComponent
          navigateTo={navigateTo}
          //   navigation={navigation}
          icon={icon}
        />
      }
      containerStyle={{
        backgroundColor: 'black',
        justifyContent: 'space-around',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        alignSelf: 'center',
      }}
    />
  );
};

export default MusicPlayerFullScreenHeader;
