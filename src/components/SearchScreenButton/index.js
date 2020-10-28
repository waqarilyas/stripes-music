import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

const SearchScreenButton = ({ title, selected }) => {
  return (
    <View style={selected ? styles.selectedStyle : styles.Button}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: 'grey',
    paddingVertical: RFValue('12'),
    borderRadius: RFValue('8'),
    marginHorizontal: RFValue('10'),
  },
  selectedStyle: {
    backgroundColor: '#F5138E',
    color: 'white',
    paddingVertical: RFValue('12'),
    borderRadius: RFValue('8'),
    fontWeight: 'bold',
    marginHorizontal: RFValue('10'),
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default SearchScreenButton;
