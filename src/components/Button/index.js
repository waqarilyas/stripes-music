import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './styles';

const Button = ({ onPress, text, isSubmitting = false }) => {
  return (
    <TouchableOpacity
      disabled={isSubmitting}
      style={styles.backgroundStyle}
      onPress={onPress}>
      {isSubmitting ? (
        <>
          <ActivityIndicator color="white" />
        </>
      ) : (
        <Text style={styles.textStyle}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
