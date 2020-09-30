import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Header, Avatar, Image } from 'react-native-elements';

import styles from './styles';

const LeftComponent = ({ navigateTo, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
      <View style={styles.leftContainer}>
        <Text style={styles.leftText}>New Message</Text>
      </View>
    </TouchableOpacity>
  );
};
const RightComponent = () => {
  return (
    <View style={styles.rightContainer}>
      <Avatar
        rounded
        size="medium"
        source={require('../../../Assets/Images/songCover1.jpg')}
      />
      <Image
        source={require('../../../Assets/Icons/search-icon.png')}
        style={styles.search}
      />
    </View>
  );
};
const ChatScreenHeader = ({ navigation, navigateTo }) => {
  return (
    <Header
      barStyle="light-content"
      placement="left"
      containerStyle={{
        backgroundColor: 'black',
        justifyContent: 'space-around',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        marginTop: 10,
      }}
      leftComponent={
        <LeftComponent navigateTo={navigateTo} navigation={navigation} />
      }
      rightComponent={<RightComponent />}
    />
  );
};

export default ChatScreenHeader;
