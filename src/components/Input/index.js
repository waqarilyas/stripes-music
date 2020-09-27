import React from 'react';
import { View, Image, TextInput } from 'react-native';

import styles from './styles';

const Input = ({
  icon,
  name,
  textType,
  capitalize,
  keyboardType = 'default',
  defaultValue,
  onChangeText,
  secureTextEntry = false,
}) => {
  return (
    <>
      <View style={styles.input}>
        <Image source={icon} style={styles.inputIcon} />
        <TextInput
          placeholder={name}
          placeholderTextColor="#515151"
          style={styles.textInput}
          textContentType={textType}
          autoCapitalize={capitalize}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </>
  );
};

export default Input;
