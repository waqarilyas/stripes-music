import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const Button = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.backgroundStyle} onPress={onPress}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
