import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Header, Avatar, Image } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const LeftComponent = ({ navigateTo, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
      <LinearGradient
        colors={['#F5148E', '#c9227b']}
        style={styles.leftContainer}>
        <Text style={styles.leftText}>NEW MESSAGE</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const RightComponent = ({ toggleSearch }) => {
  return (
    <View style={styles.rightContainer}>
      <Avatar
        rounded
        size="small"
        source={require('../../../Assets/Images/songCover1.jpg')}
        containerStyle={styles.avatar}
      />
      <TouchableOpacity onPress={() => toggleSearch()}>
        <Image
          source={require('../../../Assets/Icons/search-icon.png')}
          style={styles.search}
        />
      </TouchableOpacity>
    </View>
  );
};

const ChatScreenHeader = ({ navigation, navigateTo, toggleSearch }) => {
  return (
    <Header
      barStyle="light-content"
      placement="left"
      containerStyle={styles.container}
      leftComponent={
        <LeftComponent navigateTo={navigateTo} navigation={navigation} />
      }
      rightComponent={<RightComponent toggleSearch={toggleSearch} />}
    />
  );
};

export default ChatScreenHeader;
