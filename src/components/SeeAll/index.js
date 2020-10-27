import React from 'react';
import { TouchableOpacity, Image, Text, ImageBackground } from 'react-native';

import styles from './styles';
import { sendIcon } from '../../../Assets/Icons';

const SeeAll = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.seeAllContainer}>
      <Image source={sendIcon} style={styles.icon} />
      <Text style={styles.text}>SEE ALL</Text>
    </TouchableOpacity>
  );
};

export default SeeAll;
