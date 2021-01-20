// Module imports

import React from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const deviceHeight = Dimensions.get('window').height;

const TextBox = ({
  text,
  onChangeText,
  contentType,
  defaultValue,
  blurOnSubmit,
}) => {
  console.log(defaultValue);

  return (
    <View style={styles.maincontainer}>
      <TextInput
        blurOnSubmit={blurOnSubmit}
        autoCapitalize={false}
        style={styles.Textinputstyle}
        defaultValue={defaultValue}
        placeholder={text}
        placeholderTextColor="#5E5A5E"
        onChangeText={onChangeText}
        textContentType={contentType}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    marginVertical: deviceHeight / 60,
  },
  Textinputstyle: {
    backgroundColor: '#2c262b',
    fontSize: 14,
    borderRadius: 5,
    color: 'white',
    paddingHorizontal: 15,
    width: '90%',
    paddingVertical: wp('2'),
  },
});

export default TextBox;
