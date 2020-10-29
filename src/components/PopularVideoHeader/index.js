import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Image } from 'react-native-elements';

import { playIcon } from '../../../Assets/Icons';
import styles from './style';

const PopularVideoHeader = ({ poster, title, onPress }) => {
  return (
    <ImageBackground source={{ uri: poster }} style={styles.header}>
      <View style={styles.view}>
        <Text numberOfLines={1} style={styles.text}>
          {title}
        </Text>
        <TouchableOpacity style={styles.iconPlacement} onPress={onPress}>
          <Image source={playIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PopularVideoHeader;
