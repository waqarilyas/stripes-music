import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { editProfileIcon, plusIcon } from '../../../Assets/Icons';

const ProfileActionBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.subContainer}
        onPress={() => navigation.navigate('CreateNewPlaylist')}>
        <Image source={plusIcon} style={styles.icon} />
        <Text style={styles.title}>Create New Playlist</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.subContainer}
        onPress={() => navigation.navigate('CreateNewPlaylist')}>
        <Image source={editProfileIcon} style={styles.icon} />
        <Text style={styles.title}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: hp('5'),
    marginHorizontal: hp('2'),
  },
  subContainer: {
    flex: 1,
  },
  icon: {
    height: hp('3'),
    width: hp('3'),
    alignSelf: 'center',
    marginBottom: hp('2'),
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: hp('1.3'),
  },
});

export default ProfileActionBar;
