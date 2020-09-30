import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';

import { playIcon } from '../../../Assets/Icons';
import styles from './style';

const PopularVideoHeader = ({ poster, title }) => {
  return (
    <Image source={{ uri: poster }} style={styles.header}>
      <View style={styles.view}>
        <Text numberOfLines={1} style={styles.text}>
          {title}
        </Text>
        <TouchableOpacity style={styles.iconPlacement}>
          <Image source={playIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </Image>
  );
};

export default PopularVideoHeader;
