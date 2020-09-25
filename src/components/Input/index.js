import React from 'react';
import { View, Image, TextInput } from 'react-native';

import styles from './styles';
import {} from '../../../Assets/Icons';

const Input = ({ icon, name }) => {
  return (
    <View style={styles.input}>
      <Image source={icon} style={styles.inputIcon} />
      <TextInput
        placeholder={name}
        placeholderTextColor="#515151"
        style={styles.textInput}
      />
    </View>
  );
};

export default Input;
