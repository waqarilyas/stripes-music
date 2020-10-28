import React from 'react';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { searchIcon } from '../../../Assets/Icons';

const MiniSearchModal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchWithClose}>
        <View style={styles.searchContainer}>
          <Image source={searchIcon} style={styles.searchIcon} />
          <TextInput
            placeholder="Search..."
            style={styles.textInput}
            textStyle={{ color: 'white' }}
            placeholderTextColor="#918E96"
          />
        </View>
        <Text style={styles.closeButton} onPress={() => navigation.goBack()}>
          Close
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F111C',
    paddingVertical: RFValue('50'),
  },
  searchWithClose: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RFValue('10'),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3E3947',
    borderRadius: RFValue('10'),
    flex: 1,
  },
  searchIcon: {
    resizeMode: 'contain',
    height: RFValue('16'),
    width: RFValue('16'),
    marginHorizontal: RFValue('10'),
  },
  textInput: {
    height: RFValue(35),
    margin: RFValue('5'),
    color: 'white',
  },
  closeButton: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: RFValue('10'),
    // paddingHorizontal: RFValue('10'),
  },
});

export default MiniSearchModal;
